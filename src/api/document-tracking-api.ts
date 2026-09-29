import {
    DocumentTrack,
    DocumentTrackPayload,
    ReceiverAction,
    ReceiverActionFields,
    TrackActor,
    TrackHistoryEntry,
} from "@/types/document-tracking.types";
import { TRACK_OFFICES, TRACK_ROUTING_OFFICES, TRACK_STATUS, USER_ROLE } from "@/utils/constant";

// Mock until the backend ships a document-tracking module. Keep the method
// signatures stable so only this file changes when the real API exists.
const STORAGE_KEY = "effinance.mock.documentTracks";
const INVALID_TRANSITION = "Invalid track transition";
const CREATOR_ROLES: string[] = [USER_ROLE.COORDINATOR, USER_ROLE.ADMIN];
const RECEIVABLE: string[] = [TRACK_STATUS.SUBMITTED, TRACK_STATUS.FORWARDED, TRACK_STATUS.RETURNED];

const isBlank = (value?: string) => !value || value.trim() === "";

const readTracks = (): DocumentTrack[] => {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeTracks = (tracks: DocumentTrack[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
};

const nextTrackNumber = (tracks: DocumentTrack[]) => {
    const max = tracks.reduce((highest, track) => {
        const seq = parseInt(track.trackNumber?.replace("DTS-", ""), 10);
        return Number.isNaN(seq) ? highest : Math.max(highest, seq);
    }, 0);
    return `DTS-${String(max + 1).padStart(4, "0")}`;
};

const validatePayload = (payload: DocumentTrackPayload) => {
    const required: (keyof DocumentTrackPayload)[] = [
        "title", "particulars", "processType", "purpose", "sponsorshipId", "destination",
    ];
    const missing = required.find((field) => isBlank(payload[field]));
    if (missing) throw new Error(`Missing required field: ${missing}`);
    if (!TRACK_OFFICES.includes(payload.destination)) throw new Error(INVALID_TRANSITION);
};

const entry = (
    action: TrackHistoryEntry["action"],
    status: TrackHistoryEntry["status"],
    fromOffice: string,
    toOffice: string | null,
    remarks: string | null,
    actor: TrackActor,
): TrackHistoryEntry => ({
    action, status, fromOffice, toOffice, remarks, actor, at: new Date().toISOString(),
});

const submit = (track: DocumentTrack, destination: string, actor: TrackActor): DocumentTrack => ({
    ...track,
    status: TRACK_STATUS.SUBMITTED,
    currentHolder: destination,
    submittedAt: new Date().toISOString(),
    history: [...track.history, entry("SUBMITTED", TRACK_STATUS.SUBMITTED, actor.office, destination, null, actor)],
});

// Returns go back to whoever handed the track to the current holder.
const returnTarget = (track: DocumentTrack) => {
    const handoff = [...track.history].reverse().find(
        (item) => (item.action === "FORWARDED" || item.action === "SUBMITTED") && item.toOffice === track.currentHolder,
    );
    return handoff?.fromOffice ?? null;
};

export default class DocumentTrackingAPIService {
    async getTracks(): Promise<DocumentTrack[]> {
        return readTracks();
    }

    async getTrack(trackId: string): Promise<DocumentTrack | null> {
        return readTracks().find((track) => track.id === trackId) ?? null;
    }

    async createTrack(payload: DocumentTrackPayload, actor: TrackActor, asDraft: boolean): Promise<DocumentTrack> {
        if (!CREATOR_ROLES.includes(actor.office)) throw new Error(INVALID_TRANSITION);
        validatePayload(payload);

        const tracks = readTracks();
        const { destination, ...details } = payload;
        const draft: DocumentTrack = {
            ...details,
            id: crypto.randomUUID(),
            trackNumber: nextTrackNumber(tracks),
            status: TRACK_STATUS.DRAFT,
            currentHolder: actor.office,
            createdBy: { userId: actor.userId, name: actor.name },
            createdAt: new Date().toISOString(),
            submittedAt: null,
            history: [entry("CREATED", TRACK_STATUS.DRAFT, actor.office, destination, null, actor)],
        };
        const track = asDraft ? draft : submit(draft, destination, actor);
        writeTracks([...tracks, track]);
        return track;
    }

    async updateDraft(trackId: string, payload: DocumentTrackPayload, actor: TrackActor, andSubmit = false): Promise<DocumentTrack> {
        validatePayload(payload);
        return this.mutate(trackId, (track) => {
            if (track.status !== TRACK_STATUS.DRAFT || track.createdBy.userId !== actor.userId) {
                throw new Error(INVALID_TRANSITION);
            }
            const { destination, ...details } = payload;
            const history = track.history.map((item, index) =>
                index === 0 && item.action === "CREATED" ? { ...item, toOffice: destination } : item,
            );
            const updated = { ...track, ...details, history };
            return andSubmit ? submit(updated, destination, actor) : updated;
        });
    }

    async submitDraft(trackId: string, actor: TrackActor): Promise<DocumentTrack> {
        return this.mutate(trackId, (track) => {
            const destination = track.history[0]?.toOffice;
            if (track.status !== TRACK_STATUS.DRAFT || track.createdBy.userId !== actor.userId || !destination) {
                throw new Error(INVALID_TRANSITION);
            }
            return submit(track, destination, actor);
        });
    }

    async applyAction(
        trackId: string,
        action: ReceiverAction,
        fields: ReceiverActionFields,
        actor: TrackActor,
    ): Promise<DocumentTrack> {
        return this.mutate(trackId, (track) => {
            if (!allowedActions(track, actor.office).includes(action)) throw new Error(INVALID_TRANSITION);

            const remarks = fields.remarks?.trim() || null;
            const from = track.currentHolder;

            if (action === "ACCEPT") {
                return {
                    ...track,
                    status: TRACK_STATUS.IN_PROCESSED,
                    history: [...track.history, entry("ACCEPTED", TRACK_STATUS.IN_PROCESSED, from, null, null, actor)],
                };
            }

            if (!remarks) throw new Error("Missing required field: remarks");

            if (action === "FORWARD") {
                const destination = fields.destination ?? "";
                if (!TRACK_ROUTING_OFFICES.includes(destination) || destination === from) {
                    throw new Error(INVALID_TRANSITION);
                }
                return {
                    ...track,
                    status: TRACK_STATUS.FORWARDED,
                    currentHolder: destination,
                    history: [...track.history, entry("FORWARDED", TRACK_STATUS.FORWARDED, from, destination, remarks, actor)],
                };
            }

            if (action === "RETURN") {
                const target = returnTarget(track);
                if (!target) throw new Error(INVALID_TRANSITION);
                return {
                    ...track,
                    status: TRACK_STATUS.RETURNED,
                    currentHolder: target,
                    history: [...track.history, entry("RETURNED", TRACK_STATUS.RETURNED, from, target, remarks, actor)],
                };
            }

            return {
                ...track,
                status: TRACK_STATUS.DONE,
                history: [...track.history, entry("DONE", TRACK_STATUS.DONE, from, null, remarks, actor)],
            };
        });
    }

    private async mutate(trackId: string, change: (track: DocumentTrack) => DocumentTrack): Promise<DocumentTrack> {
        const tracks = readTracks();
        const index = tracks.findIndex((track) => track.id === trackId);
        if (index === -1) throw new Error("Track not found");

        const updated = change(tracks[index]);
        const next = [...tracks];
        next[index] = updated;
        writeTracks(next);
        return updated;
    }
}

export const allowedActions = (track: DocumentTrack, office: string): ReceiverAction[] => {
    if (track.currentHolder !== office) return [];
    if (RECEIVABLE.includes(track.status)) return ["ACCEPT"];
    if (track.status === TRACK_STATUS.IN_PROCESSED) {
        return returnTarget(track) ? ["FORWARD", "RETURN", "DONE"] : ["FORWARD", "DONE"];
    }
    return [];
};
