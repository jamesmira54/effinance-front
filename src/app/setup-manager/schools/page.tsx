import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Schools",
};

const SchoolPage: React.FC = () => {
    return (
      <DefaultLayout>
        <p>Schools Page</p>
      </DefaultLayout>
    );
  };
  
export default SchoolPage;