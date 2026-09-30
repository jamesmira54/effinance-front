import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import OfficeTrackSetupListing from "@/screens/setup-manager/office-track/OfficeTrackSetupListing";
import { getTrackSession } from "../../document-tracking/current-user";

export const metadata: Metadata = {
  title: "Effinance - Process Type",
};

const ProcessTypePage = async () => {
  const currentUser = await getTrackSession();

  return (
    <>
      <Breadcrumb pageName="Process Type" />
      <OfficeTrackSetupListing kind="process-types" title="Process Type" canManage={Boolean(currentUser?.canCreate)} />
    </>
  );
};

export default ProcessTypePage;
