import { Metadata } from "next";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ScheduleAPIService, SponsorshipAPIService } from "@/api";
import { ScheduleListing } from "@/screens";

export const metadata: Metadata = {
  title: "Effinance - Schedules",
};

const SchedulesPage = async () => {
    const scheduleAPI = new ScheduleAPIService();
    const sponsorshipAPI = new SponsorshipAPIService();
    const [schedules, sponsorships] = await Promise.all([
      scheduleAPI.getAllSchedules(),
      sponsorshipAPI.getAllSponsorships(),
    ]);

    return (
      <>
        <Breadcrumb pageName="Schedules" />
        <ScheduleListing serverData={{ schedules: schedules || [], sponsorships: sponsorships || [] }} />
      </>
    );
  };
  
export default SchedulesPage;
