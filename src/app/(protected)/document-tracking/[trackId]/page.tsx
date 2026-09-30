import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DocumentTrackView from "@/screens/document-tracking/DocumentTrackView";
import NoTrackAccess from "@/screens/document-tracking/NoTrackAccess";
import { DocumentTrackingAPIService } from "@/api";
import { toOptions } from "@/screens/document-tracking/trackDisplay";
import { getTrackSession, hasTrackAccess } from "../current-user";
import { getTrackFormOptions } from "../sponsorship-options";

export const metadata: Metadata = {
  title: "Effinance - Track Details",
};

const trackingAPI = new DocumentTrackingAPIService();

const TrackDetailPage = async ({ params }: { params: Promise<{ trackId: string }> }) => {
  const { trackId } = await params;
  const currentUser = await getTrackSession();

  if (!hasTrackAccess(currentUser)) {
    return (
      <>
        <Breadcrumb pageName="Track Details" />
        <NoTrackAccess />
      </>
    );
  }

  // Creators need every dropdown for editing; office users only route between offices.
  const options = currentUser.canCreate
    ? await getTrackFormOptions()
    : {
        processTypes: [],
        purposes: [],
        sponsorships: [],
        offices: toOptions((await trackingAPI.setupList("offices", { active: true, limit: 100 }))?.data ?? []),
      };

  return (
    <>
      <Breadcrumb pageName="Track Details" />
      <DocumentTrackView trackId={trackId} currentUser={currentUser} options={options} />
    </>
  );
};

export default TrackDetailPage;
