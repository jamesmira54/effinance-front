import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Announcements",
};

const Announcements = () => {
  return (
    <>
      <Breadcrumb pageName="Announcements" />
      <p>Content coming soon...</p>
    </>
  );
};

export default Announcements;
