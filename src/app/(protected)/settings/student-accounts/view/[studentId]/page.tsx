import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentProfile } from "@/screens/settings";
import { StudentAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Student Profile",
};

interface StudentDetailsProps {
  params: Promise<{
    studentId: string;
  }>;
}

const studentAPI = new StudentAPIService();

const fetchStudentProfile = async (userId: string) => {
  return await studentAPI.getStudentProfile(userId);
};

const StudentViewProfile = async ({ params }: StudentDetailsProps) => {
  const { studentId } = await params;

  const studentDetails = await fetchStudentProfile(studentId);

  return (
    <>
      <Breadcrumb pageName=" Student Profile" />
      <div className="flex flex-col gap-6">
        <StudentProfile
          studentDetails={studentDetails}
          allowRouterBack={true}
        />
      </div>
    </>
  );
};

export default StudentViewProfile;
