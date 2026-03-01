import SponsorshipAPIService from "@/api/sponsorships-api";
import CriteriaSetup from "@/screens/setup-manager/criteria-setup/CriteriaSetup";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Criterion Setup",
};

const SponsorshipAPI = new SponsorshipAPIService();
const getCriterionCategories = async () => {
  const response = await SponsorshipAPI.getAllCriterionCategories();
  return response;
}

const CriteriaPage= async () => {
    const criterionCategories = await getCriterionCategories();

    const serverData = {
        criterionCategories: criterionCategories || [],
    }
    
    return (
      <>
        <CriteriaSetup serverData={serverData}/>
      </>
    );
  };
  
export default CriteriaPage;