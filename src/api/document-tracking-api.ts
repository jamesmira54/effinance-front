import AxiosAPI from "./axios-api";
import {
    DocumentTrack,
    DocumentTrackPayload,
    Paginated,
    ReceiverActionFields,
    SetupItem,
    SetupKind,
    TrackCurrentUser,
    TrackListParams,
} from "@/types/document-tracking.types";

export default class DocumentTrackingAPIService extends AxiosAPI {
    constructor() {
        super({ resourcePath: "/api/v1/document-tracks" });
    }

    async me(): Promise<TrackCurrentUser> {
        return this.get({ path: "/me" });
    }

    // The API rejects empty filters, so only send what is set.
    async list({ offset, limit, status, inbox, search }: TrackListParams): Promise<Paginated<DocumentTrack>> {
        const params: Record<string, string | number | boolean> = { offset, limit, sort: "desc" };
        if (status) params.status = status;
        if (inbox) params.inbox = true;
        if (search?.trim()) params.search = search.trim();
        return this.get({ params });
    }

    async getTrack(trackId: string): Promise<DocumentTrack> {
        return this.get({ path: `/${trackId}` });
    }

    async create(payload: DocumentTrackPayload): Promise<DocumentTrack> {
        return this.post({ body: payload });
    }

    async update(trackId: string, payload: DocumentTrackPayload): Promise<DocumentTrack> {
        return this.put({ path: `/${trackId}`, body: payload });
    }

    async discard(trackId: string): Promise<string> {
        return this.delete({ path: `/${trackId}` });
    }

    async submit(trackId: string, fields: ReceiverActionFields): Promise<DocumentTrack> {
        return this.post({ path: `/${trackId}/submit`, body: fields });
    }

    async accept(trackId: string, fields: ReceiverActionFields): Promise<DocumentTrack> {
        return this.post({ path: `/${trackId}/accept`, body: fields });
    }

    async forward(trackId: string, fields: ReceiverActionFields): Promise<DocumentTrack> {
        return this.post({ path: `/${trackId}/forward`, body: fields });
    }

    async returnTrack(trackId: string, fields: ReceiverActionFields): Promise<DocumentTrack> {
        return this.post({ path: `/${trackId}/return`, body: fields });
    }

    async done(trackId: string, fields: ReceiverActionFields): Promise<DocumentTrack> {
        return this.post({ path: `/${trackId}/done`, body: fields });
    }

    async setupList(kind: SetupKind, params: { active?: boolean; limit?: number } = {}): Promise<Paginated<SetupItem>> {
        return this.get({ path: `/setup/${kind}`, params });
    }

    // The PDF is binary, so it skips the { data } envelope unwrap used everywhere else.
    async pdf(trackId: string): Promise<Blob> {
        const response = await this.api.get(`/${trackId}/pdf`, { responseType: "blob" });
        return response.data;
    }
}
