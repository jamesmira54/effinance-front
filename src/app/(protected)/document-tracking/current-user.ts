import { AuthAPIService, UserAPIService } from "@/api";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";
import { TrackCurrentUser } from "@/types/document-tracking.types";
import { AppliedSponsorshipDetailResponse } from "@/types/sponsorship.types";
import { APPLICATION_STATUS } from "@/utils/constant";

const authAPI = new AuthAPIService();
const userAPI = new UserAPIService();
const sponsorshipStudentAPI = new SponsorshipStudentAPIService();

const getAwardedSponsorshipIds = async (studentId: string | null) => {
    if (!studentId) return [];
    const applied: { data?: AppliedSponsorshipDetailResponse[] } | null =
        await sponsorshipStudentAPI.getSponsorshipApplied(studentId);
    return (applied?.data ?? [])
        .filter((item) => item.sponsorshipStatus === APPLICATION_STATUS.AWARDED)
        .map((item) => item.sponsorshipId);
};

export const getTrackSession = async () => {
    const session = await authAPI.me();
    const profile = await userAPI.profile(session.userId);

    const currentUser: TrackCurrentUser = {
        userId: session.userId,
        name: `${profile.firstName} ${profile.lastName}`,
        userType: profile.userType,
    };

    return { currentUser, awardedSponsorshipIds: await getAwardedSponsorshipIds(session.studentId) };
};
