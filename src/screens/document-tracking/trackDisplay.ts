import { DocumentTrack, TrackCurrentUser } from "@/types/document-tracking.types";
import { BadgeProps } from "@/components/Badge/Badge.types";
import {
    PROCESS_TYPE_OPTIONS,
    TRACK_PURPOSE_OPTIONS,
    TRACK_STATUS,
    TRACK_STATUS_LABEL,
    USER_ROLE,
} from "@/utils/constant";

export const isTrackCreator = (userType: string) =>
    userType === USER_ROLE.COORDINATOR || userType === USER_ROLE.ADMIN;

export const canViewTrack = (track: DocumentTrack, user: TrackCurrentUser, awardedSponsorshipIds: string[]) => {
    if (isTrackCreator(user.userType)) return true;
    if (track.status === TRACK_STATUS.DRAFT) return false;
    if (user.userType === USER_ROLE.STUDENT) return awardedSponsorshipIds.includes(track.sponsorshipId);
    return track.currentHolder === user.userType || track.history.some(
        (item) => item.fromOffice === user.userType || item.toOffice === user.userType,
    );
};

export const statusLabel = (status: string) => TRACK_STATUS_LABEL[status] ?? status;

export const statusVariant = (status: string): BadgeProps["variants"] => {
    if (status === TRACK_STATUS.DONE) return "success";
    if (status === TRACK_STATUS.RETURNED) return "error";
    if (status === TRACK_STATUS.DRAFT) return "warning";
    return "default";
};

export const processTypeLabel = (value: string) =>
    PROCESS_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value;

export const purposeLabel = (value: string) =>
    TRACK_PURPOSE_OPTIONS.find((option) => option.value === value)?.label ?? value;

export const lastUpdated = (track: DocumentTrack) => track.history[track.history.length - 1]?.at ?? track.createdAt;

export const formatDateTime = (iso: string) => new Date(iso).toLocaleString("en-US");
