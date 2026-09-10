import { Metadata } from "next";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentProfileForm } from "@/screens/settings";
import {
  AddressAPIService,
  AuthAPIService,
  SchoolAPIService,
  StudentAPIService,
} from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Edit Profile",
};

const authAPI = new AuthAPIService();
const studentAPI = new StudentAPIService();
const addressAPI = new AddressAPIService();
const schoolAPI = new SchoolAPIService();

const ProfileEdit = async () => {
  const session = await authAPI.me();
  if (!session?.studentId) {
    redirect("/settings/profile");
  }

  const [studentDetails, provinces, regions, schools] = await Promise.all([
    studentAPI.getStudentProfile(session.studentId),
    addressAPI.getAllProvinces(),
    addressAPI.getAllRegions(),
    schoolAPI.getAllSchools(),
  ]);

  if (!studentDetails) {
    redirect("/settings/profile");
  }

  return (
    <>
      <Breadcrumb pageName="Edit Profile" />
      <StudentProfileForm
        studentDetails={studentDetails}
        provinces={Array.isArray(provinces) ? provinces : []}
        regions={Array.isArray(regions) ? regions : []}
        schools={Array.isArray(schools) ? schools : []}
      />
    </>
  );
};

export default ProfileEdit;
