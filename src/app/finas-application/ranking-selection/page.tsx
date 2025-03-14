import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Effinance - Ranking Selection",
};

const RankingSelection = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ranking Selection" />
    </DefaultLayout>
  );
};

export default RankingSelection;
