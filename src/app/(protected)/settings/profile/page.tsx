import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { MainProfile, StudentProfile } from "@/screens/settings";
import { AuthAPIService, RolesAPIService, StudentAPIService, UserAPIService } from "@/api";
import { APIUserRoles } from "@/types";

export const metadata: Metadata = {
  title: "Effinance - Profile",
};


const authAPI = new AuthAPIService();
const userAPI = new UserAPIService();
const studentAPI = new StudentAPIService();
const rolesAPI = new RolesAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
}

const fetchProfile = async (userId: string) => {
  return await userAPI.profile(userId);
}

const fetchStudentProfile = async (userId: string) => {
  return await studentAPI.getStudentProfile(userId);
}


const fetchRoles = async () => {
  return await rolesAPI.roles();
}


const Profile = async() => {

  let userId = '';
  const getUserSession = await fetchUserSession();
  if(getUserSession) {
    userId = getUserSession.userId;
  }
  
  let userType = '';
  let studentDetails = null;
  const userDetails = await fetchProfile(userId);
  if(userDetails) {
    userType = userDetails.userType;
  }
  
  let studentId = '';
  if(userType === 'Student' && getUserSession.studentId !== null) {
    studentId = getUserSession.studentId;
    studentDetails = await fetchStudentProfile(studentId);
  }


  let roles: APIUserRoles[] = [];
  if(userType === 'System Admin') {
    roles = await fetchRoles();
  }
  
  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="flex gap-6 flex-col">
        <MainProfile userDetails={userDetails} roles={roles}/>
        {userType === 'Student' &&
          <StudentProfile studentDetails={studentDetails}/>
      }
      </div>
    </>
  );
};

export default Profile;
