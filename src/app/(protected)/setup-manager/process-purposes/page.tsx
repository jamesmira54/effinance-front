import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import OfficeTrackSetupListing from "@/screens/setup-manager/office-track/OfficeTrackSetupListing";
import { getTrackSession } from "../../document-tracking/current-user";

export const metadata: Metadata = {
  title: "Effinance - Process Purpose",
};

const ProcessPurposePage = async () => {
  const currentUser = await getTrackSession();

  return (
    <>
      <Breadcrumb pageName="Process Purpose" />
      <OfficeTrackSetupListing kind="purposes" title="Process Purpose" canManage={Boolean(currentUser?.canCreate)} />
    </>
  );
};

export default ProcessPurposePage;
