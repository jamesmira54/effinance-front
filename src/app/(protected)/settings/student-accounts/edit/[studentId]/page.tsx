import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentProfileForm } from "@/screens/settings";
import {AddressAPIService, SchoolAPIService, StudentAPIService } from "@/api";

export const metadata: Metadata = {
    title: "Effinance - Edit Student Profile",
};


interface StudentDetailsProps {
    params: {
        studentId: string;
    };
}


const studentAPI = new StudentAPIService();
const AddressAPI = new AddressAPIService();
const schoolAPI = new SchoolAPIService();  


const getAllProvinces = async () => {
    return await AddressAPI.getAllProvinces();
}

const getAllRegions = async () => {
    return await AddressAPI.getAllRegions();
}

const fetchStudentProfile = async (userId: string) => {
    return await studentAPI.getStudentProfile(userId);
}

const getAllSchools = async () => {
    return await schoolAPI.getAllSchools();
}

const StudentProfileEdit = async ({ params } : StudentDetailsProps ) => {
    const { studentId } = await params;
    const studentDetails = await fetchStudentProfile(studentId);
    const provinces = await getAllProvinces();
    const regions = await getAllRegions();
    const schools = await getAllSchools();

    return (
        <>
            <Breadcrumb pageName="Edit Student Profile"/>
            <StudentProfileForm studentDetails={studentDetails} provinces={provinces} regions={regions} schools={schools}/>
        </>
    );
};

export default StudentProfileEdit;