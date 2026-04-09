import { AcademicAPIService, SchoolAPIService, SponsorshipAPIService, UploadAPIService, UserAPIService } from "@/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RankingStudentListing from "@/screens/setup-manager/ranking-student/RankingStudentListing";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Effinance - Ranking Order",
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

const RankingOrderPage = async () => {

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
      <Breadcrumb pageName="Sponsorships | Ranking Order" />
      <RankingStudentListing serverData={serverData}/>
    </>
  );
};
export default RankingOrderPage;