import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Manage Reports",
};

const ManageReport = () => {
  return (
    <>
      <Breadcrumb pageName="Manage Reports" />
      <p>Content coming soon...</p>
    </>
  );
};

export default ManageReport;