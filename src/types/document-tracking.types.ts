import { TRACK_STATUS } from "@/utils/constant";

export type TrackStatus = typeof TRACK_STATUS[keyof typeof TRACK_STATUS];
export type TrackHistoryAction = "CREATED" | "SUBMITTED" | "ACCEPTED" | "FORWARDED" | "RETURNED" | "DONE";
export type TrackAction = "EDIT" | "SUBMIT" | "ACCEPT" | "FORWARD" | "RETURN" | "DONE";
export type ReceiverAction = Exclude<TrackAction, "EDIT">;
export type SetupKind = "process-types" | "purposes" | "offices";

export interface TrackActor {
    userId: string;
    name: string;
    office: string;
    officeId: string | null;
}

export interface TrackHistoryEntry {
    sequence: number;
    action: TrackHistoryAction;
    status: TrackStatus;
    fromOffice: string;
    fromOfficeId: string | null;
    toOffice: string | null;
    toOfficeId: string | null;
    remarks: string | null;
    actor: TrackActor;
    at: string;
}

export interface DocumentTrack {
    id: string;
    trackNumber: string;
    title: string;
    particulars: string;
    processTypeId: string;
    processType: string;
    purposeId: string;
    purpose: string;
    sponsorshipId: string;
    sponsorshipName: string;
    status: TrackStatus;
    currentOfficeId: string | null;
    currentHolder: string;
    originOfficeId: string | null;
    originOffice: string | null;
    intendedDestinationId: string | null;
    intendedDestination: string | null;
    createdBy: { userId: string; name: string };
    createdAt: string;
    submittedAt: string | null;
    completedAt: string | null;
    allowedActions: TrackAction[];
    history?: TrackHistoryEntry[];
}

export interface DocumentTrackPayload {
    title: string;
    particulars: string;
    processTypeId: string;
    purposeId: string;
    sponsorshipId: string;
    destinationId?: string | null;
    submit?: boolean;
}

export interface ReceiverActionFields {
    destinationId?: string;
    remarks?: string;
}

export interface TrackCurrentUser {
    userId: string;
    name: string;
    userType: string;
    officeId: string | null;
    officeName: string | null;
    canCreate: boolean;
}

export interface SetupItem {
    id: string;
    name: string;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Paginated<T> {
    data: T[];
    total: number;
}

export interface TrackListParams {
    offset: number;
    limit: number;
    status?: TrackStatus;
    inbox?: boolean;
    search?: string;
}
