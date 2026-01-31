import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { Fragment} from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthAPIService, UserAPIService } from "@/api";


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

  return (
    <Fragment>
      <DefaultLayout userDetails={userDetails}>
        {children}
      </DefaultLayout>
    </Fragment>
  );
}
