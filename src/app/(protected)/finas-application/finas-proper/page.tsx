import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Effinance - Finas Proper",
};

const FinasProper = () => {
  return (
    <>
      <Breadcrumb pageName="Finas Proper" />
    </>
  );
};

export default FinasProper;
