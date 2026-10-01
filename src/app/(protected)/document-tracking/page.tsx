import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DocumentTrackingList from "@/screens/document-tracking/DocumentTrackingList";
import NoTrackAccess from "@/screens/document-tracking/NoTrackAccess";
import { getTrackSession, hasTrackAccess } from "./current-user";

export const metadata: Metadata = {
  title: "Effinance - Finas Tracking",
};

const DocumentTrackingPage = async () => {
  const currentUser = await getTrackSession();

  return (
    <>
      <Breadcrumb pageName="Finas Tracking" />
      {hasTrackAccess(currentUser) ? <DocumentTrackingList currentUser={currentUser} /> : <NoTrackAccess />}
    </>
  );
};

export default DocumentTrackingPage;
