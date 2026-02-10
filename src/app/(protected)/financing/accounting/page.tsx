import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Accounting",
};

const Accounting = () => {
  return (
    <>
      <Breadcrumb pageName="Accounting" />
      <p>Content coming soon...</p>
    </>
  );
};

export default Accounting;