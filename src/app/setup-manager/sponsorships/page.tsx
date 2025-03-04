import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { SponsorshipListing } from "@/screens";

export const metadata: Metadata = {
  title: "Effinance - Sponsorships",
};

const SponsorshipPage: React.FC = () => {
    return (
      <DefaultLayout>
        <SponsorshipListing/>
      </DefaultLayout>
    );
  };
  
export default SponsorshipPage;