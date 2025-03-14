import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserAccountListing from "@/screens/settings/user-accounts/UserAccountListing";

export const metadata: Metadata = {
  title: "Effinance - Requirements",
};

const UserAccount = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Accounts" />
      <div className="flex gap-6 flex-col">
        <UserAccountListing/>
      </div>
    </DefaultLayout>
  );
};

export default UserAccount;
