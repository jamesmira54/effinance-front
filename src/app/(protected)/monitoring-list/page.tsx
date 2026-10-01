import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AcademicAPIService, AuthAPIService, MonitoringAPIService, UserAPIService } from "@/api";
import MonitoringList from "@/screens/monitoring/MonitoringList";
import { USER_ROLE } from "@/utils/constant";

export const metadata: Metadata = { title: "Effinance - Monitoring List" };

// Sponsors view the list read-only; only admins and coordinators change statuses.
const canUpdateStatus = async () => {
  const session = await new AuthAPIService().me();
  const profile = await new UserAPIService().profile(session?.userId ?? "");
  return profile?.userType === USER_ROLE.ADMIN || profile?.userType === USER_ROLE.COORDINATOR;
};

const MonitoringListPage = async () => {
  const monitoringAPI = new MonitoringAPIService();
  const academicAPI = new AcademicAPIService();
  const [initialData, academicYears, canUpdate] = await Promise.all([
    monitoringAPI.getGrantees({ type: "all", offset: 0, limit: 50 }),
    academicAPI.getAllAcademicYears(),
    canUpdateStatus(),
  ]);

  return <>
    <Breadcrumb pageName="Monitoring List" />
    <MonitoringList initialData={initialData || { totalCount: 0, grantees: [] }} academicYears={academicYears || []} canUpdate={canUpdate} />
  </>;
};

export default MonitoringListPage;
