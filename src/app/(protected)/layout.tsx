import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { Fragment} from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cookies } from "next/headers";
import { getUserSession } from "@/lib/AuthService/authService";


export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("token")?.value;
  const userSession = await getUserSession(accessToken);

  return (
    <Fragment>
      <DefaultLayout userDetails={userSession}>
        {children}
      </DefaultLayout>
    </Fragment>
  );
}
