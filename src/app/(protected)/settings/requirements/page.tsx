import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MainProfile, StudentProfile } from "@/screens/settings";
import StudentRequirements from "@/screens/settings/student-requirements/StudentRequirements";

export const metadata: Metadata = {
  title: "Effinance - Requirements",
};

const Requirements = () => {
  return (
    <>
      <Breadcrumb pageName="Requirements" />
      <div className="flex gap-6 flex-col">
        <StudentRequirements/>
      </div>
    </>
  );
};

export default Requirements;
