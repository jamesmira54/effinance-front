import { DocumentTrackingAPIService } from "@/api";
import { TrackCurrentUser } from "@/types/document-tracking.types";

const trackingAPI = new DocumentTrackingAPIService();

export const getTrackSession = async (): Promise<TrackCurrentUser | null> => {
    try {
        return await trackingAPI.me();
    } catch {
        return null;
    }
};

export const hasTrackAccess = (user: TrackCurrentUser | null): user is TrackCurrentUser =>
    Boolean(user && (user.officeId || user.canCreate || user.isGrantee));
