import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Cashiering",
};

const Cashiering = () => {
  return (
    <>
      <Breadcrumb pageName="Cashiering" />
      <p>Content coming soon...</p>
    </>
  );
};

export default Cashiering;
