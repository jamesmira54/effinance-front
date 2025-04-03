import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { MainProfile, MetaProfile, StudentProfile } from "@/screens/settings";
import { AuthAPIService, UserAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Profile",
};


const authAPI = new AuthAPIService();
const userAPI = new UserAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
}

const fetchProfile = async (userId: string) => {
  return await userAPI.profile(userId);
}

const Profile = async() => {

  let accessToken = '';
  const getUserSession = await fetchUserSession();
  if(getUserSession) {
    accessToken = getUserSession.userId
  }
  
  const userDetails = await fetchProfile(accessToken);
  const studentDetails = await fetchProfile(accessToken);

  
  
  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="flex gap-6 flex-col">
        <MainProfile/>
        <StudentProfile/>
      </div>
    </>
  );
};

export default Profile;
