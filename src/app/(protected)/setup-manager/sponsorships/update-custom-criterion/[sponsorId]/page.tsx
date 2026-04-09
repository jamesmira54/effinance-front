import SponsorshipAPIService from "@/api/sponsorships-api";
import CriteriaCustomInput from "@/screens/setup-manager/criteria-custom-input/CriteriaCustomInput";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Criterion Setup",
};

const SponsorshipAPI = new SponsorshipAPIService();

const getSponsorshipDetails = async (sponsorId: string) => {
    const response = await SponsorshipAPI.getSponsorshipDetails(sponsorId);
    return response;
}

const getCustomCriterion = async () => {
    const response = await SponsorshipAPI.getCustomCriterionData();
    return response;
}

const CriteriaPage= async ({ params }: { params: { sponsorId: string } }) => {
    const { sponsorId } = await params;
    const sponsorshipDetails = await getSponsorshipDetails(sponsorId);
    const customCriterionData = await getCustomCriterion();

    const serverData = {
      sponsorshipDetails: sponsorshipDetails,
      customCriterionData: customCriterionData
    }
    
    return (
      <>
        <CriteriaCustomInput serverData={serverData}/>
      </>
    );
  };
  
export default CriteriaPage;