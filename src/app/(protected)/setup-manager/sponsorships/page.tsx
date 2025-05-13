import { Metadata } from "next";
import React from "react";
import { SponsorshipListing } from "@/screens";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AcademicAPIService, SchoolAPIService, SponsorshipAPIService, UploadAPIService, UserAPIService } from "@/api";

export const metadata: Metadata = {
  title: "Effinance - Sponsorships",
};

const UserAPI = new UserAPIService();
const SchoolAPI = new SchoolAPIService();
const UploadAPI = new UploadAPIService();
const AcademicAPI = new AcademicAPIService();
const SponsorshipAPI = new SponsorshipAPIService();

const getAllCoordinators = async () => {
    return await UserAPI.getAllUsers(true);
}

const getAllSchools = async () => {
    return await SchoolAPI.getAllSchools();
}

const getAllRequirements = async () => { 
    return await UploadAPI.getAllFileTypes();
}

const getAllAcademicYears = async () => {
    return await AcademicAPI.getAllAcademicYears();
}

const getAllSponsorships = async () => {
    return await SponsorshipAPI.getAllSponsorships();
}

const SponsorshipPage = async () => {

  const coordinators = await getAllCoordinators();
  const schools = await getAllSchools();
  const requirements = await getAllRequirements();
  const academicYears = await getAllAcademicYears();
  const sponsorships = await getAllSponsorships();

  const serverData = {
    coordinators: coordinators?.users || [],
    schools: schools,
    requirements: requirements.fileTypes || [],
    academicYears: academicYears,
    sponsorships: sponsorships || [],
  };

  return (
    <>
      <Breadcrumb pageName="Sponsorships" />
      <SponsorshipListing serverData={serverData}/>
    </>
  );
};
  
export default SponsorshipPage;