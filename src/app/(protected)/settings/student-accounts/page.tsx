import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { StudentAPIService } from "@/api";
import StduentAccountListing from "@/screens/settings/student-accounts/StudentAccountListing";

export const metadata: Metadata = {
  title: "Effinance - Student Accounts",
};


const studentAPI = new StudentAPIService;

const fetchAllStudentAccounts = async () => {
  return await studentAPI.getAllStudents();
}

const UserAccount = async () => {

  const getAllStudentAccounts = await fetchAllStudentAccounts();

  return (
    <>
      <Breadcrumb pageName="Student Accounts" />
      <div className="flex gap-6 flex-col">
        <StduentAccountListing studentAccounts={getAllStudentAccounts}/>
      </div>
    </>
  );
};

export default UserAccount;
