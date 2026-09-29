import { TRACK_STATUS } from "@/utils/constant";

export type TrackStatus = typeof TRACK_STATUS[keyof typeof TRACK_STATUS];
export type ProcessType = "SCHOLARSHIP_VOUCHER" | "SCHOLARSHIP_DISBURSEMENT";
export type TrackPurpose = "FOR_PROCESSING" | "FOR_APPROVAL" | "FOR_VALIDATION";
export type TrackHistoryAction = "CREATED" | "SUBMITTED" | "ACCEPTED" | "FORWARDED" | "RETURNED" | "DONE";
export type ReceiverAction = "ACCEPT" | "FORWARD" | "RETURN" | "DONE";

export interface TrackActor {
    userId: string;
    name: string;
    office: string;
}

export interface TrackHistoryEntry {
    action: TrackHistoryAction;
    status: TrackStatus;
    fromOffice: string;
    toOffice: string | null;
    remarks: string | null;
    actor: TrackActor;
    at: string;
}

export interface DocumentTrack {
    id: string;
    trackNumber: string;
    title: string;
    particulars: string;
    processType: ProcessType;
    purpose: TrackPurpose;
    sponsorshipId: string;
    sponsorshipName: string;
    status: TrackStatus;
    currentHolder: string;
    createdBy: { userId: string; name: string };
    createdAt: string;
    submittedAt: string | null;
    history: TrackHistoryEntry[];
}

export interface DocumentTrackPayload {
    title: string;
    particulars: string;
    processType: ProcessType;
    purpose: TrackPurpose;
    sponsorshipId: string;
    sponsorshipName: string;
    destination: string;
}

export interface ReceiverActionFields {
    destination?: string;
    remarks?: string;
}

export interface TrackCurrentUser {
    userId: string;
    name: string;
    userType: string;
}
