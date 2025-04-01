import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import SchoolListing from "@/screens/setup-manager/school/SchoolListing";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Effinance - Schools",
};

const SchoolPage: React.FC = () => {
    return (
      <>
        <Breadcrumb pageName="Schools" />
        <SchoolListing/>
      </>
    );
  };
  
export default SchoolPage;