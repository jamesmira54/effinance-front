import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { SponsorshipAPIService } from "@/api";
import { APPLICATION_STAGE } from "@/utils/constant";
import FinasProperList from "@/screens/finas-application/finas-proper/FinasProperList";

export const metadata: Metadata = {
  title: "Effinance - Pooling",
};

const SponsorshipAPI = new SponsorshipAPIService();

const getApplicationsData = async () => {
  const response = await SponsorshipAPI.getAllApplications(APPLICATION_STAGE.FINAS_PROPER);
  return response;
}



const FinasProperPage = async () => {
  const applications = await getApplicationsData();

  const serverData = {
    applications: applications?.applicants || [],
    totalCount: applications?.totalCount || 0,
  }

  return (
    <>
      <Breadcrumb pageName="Finas Proper" />
      <FinasProperList serverData={serverData}/>
    </>
  );
};

export default FinasProperPage;
