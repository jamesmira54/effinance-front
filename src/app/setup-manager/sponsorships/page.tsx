import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { SponsorshipListing } from "@/screens";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Effinance - Sponsorships",
};

const SponsorshipPage: React.FC = () => {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Sponsorships" />
        <SponsorshipListing/>
      </DefaultLayout>
    );
  };
  
export default SponsorshipPage;