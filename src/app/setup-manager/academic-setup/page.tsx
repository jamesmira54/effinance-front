import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { AcademicListingPage } from '@/screens';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Effinance - Academic Setup",
};

const AcademicSetupPage: React.FC = () => {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Acadamic Setup" />
        <AcademicListingPage/>
      </DefaultLayout>
    );
  };
  
export default AcademicSetupPage;