import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import OfficeTrackSetupListing from "@/screens/setup-manager/office-track/OfficeTrackSetupListing";
import { getTrackSession } from "../../document-tracking/current-user";

export const metadata: Metadata = {
  title: "Effinance - Process Destination",
};

const ProcessDestinationPage = async () => {
  const currentUser = await getTrackSession();

  return (
    <>
      <Breadcrumb pageName="Process Destination" />
      <OfficeTrackSetupListing kind="offices" title="Process Destination" canManage={Boolean(currentUser?.canCreate)} />
    </>
  );
};

export default ProcessDestinationPage;
