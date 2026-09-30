import { BadgeProps } from "@/components/Badge/Badge.types";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { SetupItem, TrackHistoryEntry } from "@/types/document-tracking.types";
import { TRACK_STATUS, TRACK_STATUS_LABEL } from "@/utils/constant";

export const statusLabel = (status: string) => TRACK_STATUS_LABEL[status] ?? status;

export const statusVariant = (status: string): BadgeProps["variants"] => {
    if (status === TRACK_STATUS.DONE) return "success";
    if (status === TRACK_STATUS.RETURNED) return "error";
    if (status === TRACK_STATUS.DRAFT) return "warning";
    return "default";
};

export const formatDateTime = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString("en-US", { timeZone: "Asia/Manila" }) : "-";

export const toOptions = (items: SetupItem[]): SelectOption[] =>
    items.map((item) => ({ label: item.name, value: item.id }));

export const HISTORY_LABEL: Record<TrackHistoryEntry["action"], string> = {
    CREATED: "Created",
    SUBMITTED: "Submitted",
    ACCEPTED: "Accepted / In-Processed",
    FORWARDED: "Forwarded",
    RETURNED: "Returned",
    DONE: "Done",
};

export const historyFrom = (entry: TrackHistoryEntry) => entry.fromOffice || entry.actor.name;

export interface TrackError {
    message: string;
    fieldErrors?: Record<string, string>;
    reload: boolean;
    signedOut: boolean;
}

// Every API error is HTTP 400; the body's errorMessage and errorDetails tell them apart.
export const toTrackError = (err: unknown): TrackError => {
    const body = (err as { response?: { data?: { errorMessage?: string; errorDetails?: unknown } } })?.response?.data;
    const details = body?.errorDetails;

    if (details && typeof details === "object" && Array.isArray((details as { errors?: unknown }).errors)) {
        const errors = (details as { errors: { path: string; msg: string }[] }).errors;
        return {
            message: "Please fix the highlighted fields.",
            fieldErrors: Object.fromEntries(errors.map((item) => [item.path, item.msg])),
            reload: false,
            signedOut: false,
        };
    }

    if (typeof details === "string") {
        return {
            message: details,
            reload: body?.errorMessage === "FORBIDDEN" || details.includes("updated by someone else"),
            signedOut: details === "Invalid API Token",
        };
    }

    return { message: "Something went wrong.", reload: false, signedOut: false };
};

// A failed blob request carries its JSON error body as a Blob.
export const readBlobError = async (err: unknown) => {
    const data = (err as { response?: { data?: unknown } })?.response?.data;
    if (data instanceof Blob) {
        try {
            return { response: { data: JSON.parse(await data.text()) } };
        } catch {
            return err;
        }
    }
    return err;
};
