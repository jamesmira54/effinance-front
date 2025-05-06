import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserAccountListing from "@/screens/settings/user-accounts/UserAccountListing";
import { RolesAPIService, UserAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - User Accounts",
};


const userAPI = new UserAPIService();
const rolesAPI = new RolesAPIService();

const fetchAllUserAccounts = async () => {
  return await userAPI.getAllUsers();
}

const fetchRoles = async () => {
  return await rolesAPI.roles();
}


const UserAccount = async () => {

  const getAllUserAccounts = await fetchAllUserAccounts();
  const roles = await fetchRoles();

  return (
    <>
      <Breadcrumb pageName="User Accounts" />
      <div className="flex gap-6 flex-col">
        <UserAccountListing userAccounts={getAllUserAccounts} roles={roles}/>
      </div>
    </>
  );
};

export default UserAccount;
