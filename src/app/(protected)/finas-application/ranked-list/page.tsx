import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { SponsorshipAPIService } from "@/api";
import { APPLICATION_STAGE } from "@/utils/constant";
import RankingList from "@/screens/finas-application/ranking-list/RankingList";

export const metadata: Metadata = {
  title: "Effinance - Pooling",
};

const SponsorshipAPI = new SponsorshipAPIService();

const getApplicationsData = async () => {
  const response = await SponsorshipAPI.getAllApplications(APPLICATION_STAGE.RANKING_SELECTION);
  return response;
}



const RankingListPage = async () => {
  const applications = await getApplicationsData();

  const serverData = {
    applications: applications?.applicants || [],
    totalCount: applications?.totalCount || 0,
  }

  return (
    <>
      <Breadcrumb pageName="Ranking List" />
      <RankingList serverData={serverData}/>
    </>
  );
};

export default RankingListPage;
