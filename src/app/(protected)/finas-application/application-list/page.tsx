import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Effinance - Application List",
};

const ApplicationList = () => {
  return (
    <>
      <Breadcrumb pageName="Application List" />
    </>
  );
};

export default ApplicationList;
