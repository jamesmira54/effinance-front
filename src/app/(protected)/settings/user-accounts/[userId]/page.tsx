import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { MainProfile } from "@/screens/settings";
import { RolesAPIService, UserAPIService } from "@/api";
import { APIUserRoles } from "@/types";

export const metadata: Metadata = {
  title: "Effinance - Profile",
};


interface UserDetailsProps {
  params: {
    userId: string;
  };
}

const userAPI = new UserAPIService();
const rolesAPI = new RolesAPIService();

const fetchProfile = async (userId: string) => {
  return await userAPI.profile(userId);
}

const fetchRoles = async () => {
  return await rolesAPI.roles();
}


const UserDetails = async({ params } : UserDetailsProps) => {
    const { userId } = await params;

    const userDetails = await fetchProfile(userId);
    const userType = userDetails?.userType ?? '';

    const roles: APIUserRoles[] = userType === 'System Admin' ? await fetchRoles() : [];
    
    return (
        <>
          <Breadcrumb pageName="Profile" />
          <div className="flex gap-6 flex-col">
              <MainProfile userDetails={userDetails} roles={roles} allowRouterBack={true}/>
          </div>
        </>
    );
};

export default UserDetails;
