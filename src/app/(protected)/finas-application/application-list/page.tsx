import SponsorshipAPIService from "@/api/sponsorships-api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ApplicationList from "@/screens/finas-application/applicatioon-list/ApplicationList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Application List",
};

const SponsorshipAPI = new SponsorshipAPIService();

const getApplicationsData = async () => {
  const response = await SponsorshipAPI.getAllApplications('APPLICATION_LIST');
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
      <Breadcrumb pageName="Application List" />
      <ApplicationList serverData={serverData}/>
    </>
  );
};

export default Application;
