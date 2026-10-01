import { AuthAPIService } from "@/api";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import RecommendedListing from "@/screens/sponsorship-list/recommended/RecommendedListing";

export const metadata: Metadata = {
  title: "Effinance - Available Grants",
};

const authAPI = new AuthAPIService();
const SponsorshipStudentAPI = new SponsorshipStudentAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
}

const getAvailableSponsorships = async (studentId: string | null) => {
    if(studentId !== null) {
        const response = await SponsorshipStudentAPI.getAvailableSponsorships(studentId);
        return response;
    }
    
    return [];
}


const RecommendedSponsorships = async () => {
  const getUserSession = await fetchUserSession();
  const studentId = getUserSession.studentId;
  const sponsorships = await getAvailableSponsorships(studentId);

  const serverData = {
      sponsorships: sponsorships,
      studentId: studentId
  };

  return (
    <>
      <Breadcrumb pageName="Available Grants" />
      <RecommendedListing serverData={serverData} />
    </>
  );
};

export default RecommendedSponsorships;