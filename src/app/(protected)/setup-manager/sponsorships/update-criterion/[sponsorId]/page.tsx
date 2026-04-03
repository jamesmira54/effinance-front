import SponsorshipAPIService from "@/api/sponsorships-api";
import CriteriaSetup from "@/screens/setup-manager/criteria-setup/CriteriaSetup";
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

const getCriterionCategories = async () => {
  const response = await SponsorshipAPI.getAllCriterionCategories();
  return response;
}

const getDataSources = async () => {
    const response = await SponsorshipAPI.getCriterionCategoryDataSource();
    return response;
}

const CriteriaPage= async ({ params }: { params: { sponsorId: string } }) => {
    const { sponsorId } = await params;
    const sponsorshipDetails = await getSponsorshipDetails(sponsorId);
    const criterionCategories = await getCriterionCategories();
    const dataSources = await getDataSources();

    const serverData = {
        sponsorshipDetails: sponsorshipDetails,
        criterionCategories: criterionCategories || [],
        dataSources: dataSources || [],
    }
    
    return (
      <>
        <CriteriaSetup serverData={serverData}/>
      </>
    );
  };
  
export default CriteriaPage;