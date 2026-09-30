import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DocumentTrackForm from "@/screens/document-tracking/DocumentTrackForm";
import { getTrackSession } from "../current-user";
import { getTrackFormOptions } from "../sponsorship-options";

export const metadata: Metadata = {
  title: "Effinance - Create Track",
};

const CreateTrackPage = async () => {
  const currentUser = await getTrackSession();
  const canCreate = Boolean(currentUser?.canCreate);
  const options = canCreate ? await getTrackFormOptions() : null;

  return (
    <>
      <Breadcrumb pageName="Create Track" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        {currentUser && options ? (
          <DocumentTrackForm currentUser={currentUser} options={options} />
        ) : (
          <p>Only scholarship coordinators and admins can create document tracks.</p>
        )}
      </div>
    </>
  );
};

export default CreateTrackPage;
