import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { MainProfile, MetaProfile, StudentProfile } from "@/screens/settings";

export const metadata: Metadata = {
  title: "Effinance - Profile",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div className="flex gap-6 flex-col">
        <MetaProfile/>
        <MainProfile/>
        <StudentProfile/>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
