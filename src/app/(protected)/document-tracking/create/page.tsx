import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DocumentTrackForm from "@/screens/document-tracking/DocumentTrackForm";
import { isTrackCreator } from "@/screens/document-tracking/trackDisplay";
import { getTrackSession } from "../current-user";
import { getSponsorshipOptions } from "../sponsorship-options";

export const metadata: Metadata = {
  title: "Effinance - Create Track",
};

const CreateTrackPage = async () => {
  const { currentUser } = await getTrackSession();
  const canCreate = isTrackCreator(currentUser.userType);
  const sponsorshipOptions = canCreate ? await getSponsorshipOptions() : [];

  return (
    <>
      <Breadcrumb pageName="Create Track" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        {canCreate ? (
          <DocumentTrackForm currentUser={currentUser} sponsorshipOptions={sponsorshipOptions} />
        ) : (
          <p>Only scholarship coordinators and admins can create document tracks.</p>
        )}
      </div>
    </>
  );
};

export default CreateTrackPage;
