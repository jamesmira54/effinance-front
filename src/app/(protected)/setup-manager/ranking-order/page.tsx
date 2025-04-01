import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Ranking Order",
};

const RankingOrderPage: React.FC = () => {
    return (
      <>
        <p>Ranking Order Page</p>
      </>
    );
  };
  
export default RankingOrderPage;