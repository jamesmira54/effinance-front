import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { Fragment} from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cookies } from "next/headers";
import { AuthAPIService, UserAPIService } from "@/api";
import { profile } from "console";


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
  
  let accessToken = '';
  const getUserSession = await fetchUserSession();
  if(getUserSession) {
    accessToken = getUserSession.userId
  }
  
  const userDetails = await fetchProfile(accessToken);

  return (
    <Fragment>
      <DefaultLayout userDetails={userDetails}>
        {children}
      </DefaultLayout>
    </Fragment>
  );
}
