import { AuthAPIService } from "@/api";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import RecommendedListing from "@/screens/sponsorship-list/recommended/RecommendedListing";

export const metadata: Metadata = {
  title: "Effinance - Recommended Sponsorships",
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

  console.log("Server Data: ", serverData);

  return (
    <>
      <Breadcrumb pageName="Recommended Sponsorships" />
      <RecommendedListing serverData={serverData} />
    </>
  );
};

export default RecommendedSponsorships;