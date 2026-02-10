import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Mayor's Office",
};

const MayorsOffice = () => {
  return (
    <>
      <Breadcrumb pageName="Mayor's Office" />
      <p>Content coming soon...</p>
    </>
  );
};

export default MayorsOffice;
