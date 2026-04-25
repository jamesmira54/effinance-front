import SponsorshipAPIService from "@/api/sponsorships-api";
import RankedStudentsListing from "@/screens/finas-application/ranking-results/RankedStudentsListing";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Ranked Results",
};

const SponsorshipAPI = new SponsorshipAPIService();

const rankedStudents = async (sponsorId: string) => {
    const response = await SponsorshipAPI.rankApplicants(sponsorId);
    return response;
}

const RankingResultsPage = async ({ params }: { params: { sponsorId: string } }) => {
    const { sponsorId } = await params;

    let rankResults = [];
    try {
        rankResults = await rankedStudents(sponsorId);
    } catch (error) {
        console.error("Failed to rank students", error);
    }

    const serverData = {
      sponsorId: sponsorId,
      rankedStudents: rankResults,
    }
    return (
      <>
        <RankedStudentsListing serverData={serverData}/>
      </>
    );
  };
  
export default RankingResultsPage;