import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Effinance - Edit Profile",
};


import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentProfileForm } from "@/screens/settings";
import { AuthAPIService, StudentAPIService } from "@/api";


const authAPI = new AuthAPIService();
const studentAPI = new StudentAPIService();

const fetchUserSession = async () => {
    return await authAPI.me();
}

const fetchStudentProfile = async (userId: string) => {
    return await studentAPI.getStudentProfile(userId);
  }

const ProfileEdit = async () => {

    let userId = '';
    const getUserSession = await fetchUserSession();
    if(getUserSession) {
        userId = getUserSession.userId;
    }

    let studentDetails = null;
    const studentId = getUserSession.studentId;
    if(studentId !== null) { 
        studentDetails = await fetchStudentProfile(studentId);
    }
    

    return (
        <>
            <Breadcrumb pageName="Edit Profile"/>
            <StudentProfileForm studentDetails={studentDetails}/>
        </>
    );
};

export default ProfileEdit;