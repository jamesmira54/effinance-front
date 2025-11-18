import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PoolingList from "@/screens/finas-application/pooling/PoolingList";
import { SponsorshipAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Pooling",
};

const SponsorshipAPI = new SponsorshipAPIService();

const getApplicationsData = async () => {
  const response = await SponsorshipAPI.getAllApplications('POOLING');
  return response;
}



const Pooling = async () => {
  const applications = await getApplicationsData();

  const serverData = {
    applications: applications?.data || [],
    totalCount: applications?.totalCount || 0,
  }

  return (
    <>
      <Breadcrumb pageName="Pooling" />
      <PoolingList serverData={serverData}/>
    </>
  );
};

export default Pooling;
