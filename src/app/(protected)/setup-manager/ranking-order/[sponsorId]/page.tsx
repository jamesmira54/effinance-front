import SponsorshipAPIService from "@/api/sponsorships-api";
import CriteriaSetup from "@/screens/setup-manager/criteria-setup/CriteriaSetup";
import RankedStudentsListing from "@/screens/setup-manager/ranking-student/RankedStudentsListing";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Ranked Students",
};

const SponsorshipAPI = new SponsorshipAPIService();

const rankedStudents = async (sponsorId: string) => {
    const response = await SponsorshipAPI.rankApplicants(sponsorId);
    return response;
}

const CriteriaPage= async ({ params }: { params: { sponsorId: string } }) => {
    const { sponsorId } = await params;

    let rankResults = [];
    try {
        rankResults = await rankedStudents(sponsorId);
    } catch (error) {
        console.error("Failed to rank students", error);
    }

    const serverData = {
        rankedStudents: rankResults,
    }
    return (
      <>
        <RankedStudentsListing serverData={serverData}/>
      </>
    );
  };
  
export default CriteriaPage;