import { Metadata } from "next";
import React from "react";
import { AcademicListingPage } from '@/screens';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AcademicAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Academic Setup",
};

const AcademicAPI = new AcademicAPIService();

const getAllAcademicYears = async () => {
  return await AcademicAPI.getAllAcademicYears();
}

const AcademicSetupPage = async () => {

    const academicYears = await getAllAcademicYears();

    return (
      <>
        <Breadcrumb pageName="Acadamic Setup" />
        <AcademicListingPage academics={academicYears}/>
      </>
    );
  };
  
export default AcademicSetupPage;