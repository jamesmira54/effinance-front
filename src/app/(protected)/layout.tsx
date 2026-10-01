import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { Fragment} from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthAPIService, UserAPIService } from "@/api";
import { USER_ROLE } from "@/utils/constant";
import { getTrackSession } from "./document-tracking/current-user";


const authAPI = new AuthAPIService();
const userAPI = new UserAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
}

const fetchProfile = async (userId: string) => {
  return await userAPI.profile(userId);
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  let userId = '';
  const getUserSession = await fetchUserSession();
  if(getUserSession) {
    userId = getUserSession.userId;
  }
  
  const userDetails = await fetchProfile(userId);
  const permissions = getUserSession?.permissions || [];
  // Only student grantees get the read-only Finas Tracking menu.
  const isGrantee = userDetails?.userType === USER_ROLE.STUDENT
    ? Boolean((await getTrackSession())?.isGrantee)
    : false;

  return (
    <Fragment>
      <DefaultLayout userDetails={userDetails} permissions={permissions} isGrantee={isGrantee}>
        {children}
      </DefaultLayout>
    </Fragment>
  );
}
