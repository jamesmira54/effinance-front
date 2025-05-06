import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentProfile } from "@/screens/settings";
import { StudentAPIService } from "@/api";

export const metadata: Metadata = {
    title: "Effinance - Student Profile",
};

interface StudentDetailsProps {
    params: {
        studentId: string;
    };
}


const studentAPI = new StudentAPIService();


const fetchStudentProfile = async (userId: string) => {
  return await studentAPI.getStudentProfile(userId);
}


const StudentViewProfile = async({ params } : StudentDetailsProps ) => {
    const { studentId } = await params;
  
    const studentDetails = await fetchStudentProfile(studentId);

    return (
        <>
            <Breadcrumb pageName=" Student Profile" />
            <div className="flex gap-6 flex-col">
                <StudentProfile studentDetails={studentDetails} allowRouterBack={true}/>
            </div>
        </>
    );
};

export default StudentViewProfile;