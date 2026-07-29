import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AcademicAPIService, MonitoringAPIService } from "@/api";
import MonitoringList from "@/screens/monitoring/MonitoringList";

export const metadata: Metadata = { title: "Effinance - Monitoring List" };

const MonitoringListPage = async () => {
  const monitoringAPI = new MonitoringAPIService();
  const academicAPI = new AcademicAPIService();
  const [initialData, academicYears] = await Promise.all([
    monitoringAPI.getGrantees({ type: "all", offset: 0, limit: 50 }),
    academicAPI.getAllAcademicYears(),
  ]);

  return <>
    <Breadcrumb pageName="Monitoring List" />
    <MonitoringList initialData={initialData || { totalCount: 0, grantees: [] }} academicYears={academicYears || []} />
  </>;
};

export default MonitoringListPage;
