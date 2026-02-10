import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Budget Office",
};

const BudgetOffice = () => {
  return (
    <>
      <Breadcrumb pageName="Budget Office" />
      <p>Content coming soon...</p>
    </>
  );
};

export default BudgetOffice;
