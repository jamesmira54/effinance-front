import { Metadata } from "next";
import React from "react";
import SchoolListing from "@/screens/setup-manager/school/SchoolListing";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddressAPIService, SchoolAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Schools",
};

const AddressAPI = new AddressAPIService();
const SchoolAPI = new SchoolAPIService();


const getAllProvinces = async () => {
    return await AddressAPI.getAllProvinces();
}

const getAllSchools = async () => {
    return await SchoolAPI.getAllSchools();
}

const SchoolPage = async () => {

    const provinces = await getAllProvinces();
    const schools = await getAllSchools();

    const serverData = {
      schools: schools,
      provinces: provinces,
    };

    return (
      <>
        <Breadcrumb pageName="Schools" />
        <SchoolListing serverData={serverData}/>
      </>
    );
  };
  
export default SchoolPage;