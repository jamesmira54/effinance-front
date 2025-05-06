import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentProfileForm } from "@/screens/settings";
import {StudentAPIService } from "@/api";

export const metadata: Metadata = {
    title: "Effinance - Edit Student Profile",
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

const StudentProfileEdit = async ({ params } : StudentDetailsProps ) => {
    const { studentId } = await params;
    const studentDetails = await fetchStudentProfile(studentId);

    return (
        <>
            <Breadcrumb pageName="Edit Student Profile"/>
            <StudentProfileForm studentDetails={studentDetails}/>
        </>
    );
};

export default StudentProfileEdit;