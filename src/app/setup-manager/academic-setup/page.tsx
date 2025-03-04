import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { AcademicListingPage } from '@/screens';

export const metadata: Metadata = {
  title: "Effinance - Academic Setup",
};

const AcademicSetupPage: React.FC = () => {
    return (
      <DefaultLayout>
        <AcademicListingPage/>
      </DefaultLayout>
    );
  };
  
export default AcademicSetupPage;