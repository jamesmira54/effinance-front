import SponsorshipAPIService from "@/api/sponsorships-api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RankingSelectionList from "@/screens/finas-application/ranking-selection/RankingSelectionList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Ranking Selection",
};

const SponsorshipAPI = new SponsorshipAPIService();

const getApplicationsData = async () => {
  const response = await SponsorshipAPI.getAllApplications('RANKING_SELECTION');
  return response;
}
  

const Application = async () => {
  const applications = await getApplicationsData();

  const serverData = {
    applications: applications?.applicants || [],
    totalCount: applications?.totalCount || 0,
  }

  return (
    <>
      <Breadcrumb pageName="Ranking Selection List" />
    </>
  );
};

export default Application;
