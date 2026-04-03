import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import AppliedListing from "@/screens/sponsorship-list/applied/AppliedListing";
import { AuthAPIService, SponsorshipAPIService } from "@/api";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";

export const metadata: Metadata = {
  title: "Effinance - Applied Sponsorships",
};

const authAPI = new AuthAPIService();
const SponsorshipStudentAPI = new SponsorshipStudentAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
}

const getAppliedSponsorships = async () => {
    const getUserSession = await fetchUserSession();
    const studentId = getUserSession.studentId;
    if(studentId !== null) {
        const response = await SponsorshipStudentAPI.getSponsorshipApplied(studentId);
        return response;
    }
    
    return [];
}

const AppliedSponsorships = async () => {

    const sponsorships = await getAppliedSponsorships();

    const serverData = {
        sponsorships: sponsorships
    };

    return (
        <>
        <Breadcrumb pageName="Applied Sponsorships" />
        <AppliedListing serverData={serverData}/>
        </>
    );
};

export default AppliedSponsorships;