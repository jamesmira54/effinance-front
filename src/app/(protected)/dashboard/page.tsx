
import { DashboardAPIService } from "@/api";
import { DashboardData } from "@/components/Dashboard/dashboard.types";
import Dashboard from "@/screens/dashboard/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance",
};

const DashboardAPI = new DashboardAPIService();


const getDashboardData = async () => {
  const response = await DashboardAPI.dashboardData();
  return response;
}
  
export default async function Home() {

  const serverData = await getDashboardData();

  return (
    <>
      <Dashboard serverData={serverData} />
    </>
  );
}
