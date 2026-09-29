import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DocumentTrackingList from "@/screens/document-tracking/DocumentTrackingList";
import { getTrackSession } from "./current-user";

export const metadata: Metadata = {
  title: "Effinance - Document Tracking",
};

const DocumentTrackingPage = async () => {
  const { currentUser, awardedSponsorshipIds } = await getTrackSession();

  return (
    <>
      <Breadcrumb pageName="Document Tracking" />
      <DocumentTrackingList currentUser={currentUser} awardedSponsorshipIds={awardedSponsorshipIds} />
    </>
  );
};

export default DocumentTrackingPage;
