import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DocumentTrackView from "@/screens/document-tracking/DocumentTrackView";
import { isTrackCreator } from "@/screens/document-tracking/trackDisplay";
import { getTrackSession } from "../current-user";
import { getSponsorshipOptions } from "../sponsorship-options";

export const metadata: Metadata = {
  title: "Effinance - Track Details",
};

const TrackDetailPage = async ({ params }: { params: Promise<{ trackId: string }> }) => {
  const { trackId } = await params;
  const { currentUser, awardedSponsorshipIds } = await getTrackSession();
  const sponsorshipOptions = isTrackCreator(currentUser.userType) ? await getSponsorshipOptions() : [];

  return (
    <>
      <div className="print:hidden">
        <Breadcrumb pageName="Track Details" />
      </div>
      <DocumentTrackView
        trackId={trackId}
        currentUser={currentUser}
        awardedSponsorshipIds={awardedSponsorshipIds}
        sponsorshipOptions={sponsorshipOptions}
      />
    </>
  );
};

export default TrackDetailPage;
