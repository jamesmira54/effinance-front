import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Treasurer's Office",
};

const TreasurersOffice = () => {
  return (
    <>
      <Breadcrumb pageName="Treasurer's Office" />
      <p>Content coming soon...</p>
    </>
  );
};

export default TreasurersOffice;
