import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Effinance - Ranking Selection",
};

const RankingSelection = () => {
  return (
    <>
      <Breadcrumb pageName="Ranking Selection" />
    </>
  );
};

export default RankingSelection;
