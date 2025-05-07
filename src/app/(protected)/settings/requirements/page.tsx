import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import StudentRequirements from "@/screens/settings/student-requirements/StudentRequirements";
import { AuthAPIService, StudentAPIService, UploadAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Requirements",
};

const authAPI = new AuthAPIService();
const uploadAPI = new UploadAPIService();
const studentAPI = new StudentAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
}


const fetchAllFileTypes = async () => {
  return await uploadAPI.getAllFileTypes();
};


const fetchStudentFiles = async (studentId: string) => {
  return await studentAPI.getStudentFiles(studentId);
}

const Requirements = async () => {

  let studentId = '';
  const getUserSession = await fetchUserSession();
  if(getUserSession) {
    studentId = getUserSession.studentId || '';
  }

  const fileTypes = await fetchAllFileTypes();
  const getStudentFiles = await fetchStudentFiles(studentId);


  return (
    <>
      <Breadcrumb pageName="Requirements" />
      <div className="flex gap-6 flex-col">
        <StudentRequirements fileTypes={fileTypes} studentId={studentId} files={getStudentFiles}/>
      </div>
    </>
  );
};

export default Requirements;
