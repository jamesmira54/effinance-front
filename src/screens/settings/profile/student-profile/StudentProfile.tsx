"use client";
import React, { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { CiEdit } from "react-icons/ci";
import Button from "@/components/Button";
import StudentProfileForm from "./StudentProfileForm";
import Tabs from "@/components/Tabs";
import { APIStudentListResponse, SiblingRequest } from "@/types";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FormattedDate } from "@/utils/helpers";
import { useLoader } from "@/context/LoaderContext";

const StudentProfile: React.FC<{
  studentDetails: APIStudentListResponse;
  allowRouterBack: boolean;
}> = ({ studentDetails, allowRouterBack }) => {
  const router = useRouter();
  const { showLoader } = useLoader();

  const handleBack = () => {
    if (allowRouterBack) {
      router.back();
    }
  };

  const onEdit = () => {
    showLoader();
    router.push(`/settings/student-accounts/edit/${studentDetails.studentId}`);
  };

  const PersonalInfo = () => {
    return (
      <Fragment>
        <div className="border-gray-200 dark:border-gray-800 rounded-2xl border bg-white p-5 dark:bg-slate-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Middle Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.middleName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Mobile Number
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.mobileNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Gender
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.sex}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Birthdate
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {FormattedDate(studentDetails.birthdate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Birth Place
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.placeOfBirth}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Solo Parent
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.isSoloParent ? "YES" : "NO"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Child of Solo Parent
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.isChildOfSoloParent ? "YES" : "NO"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Member of Indigenous People
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.isIndigenousPeople ? "YES" : "NO"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    SPED
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.isSped ? "YES" : "NO"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    PWD
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.isPwd ? "YES" : "NO"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Emergency Contact Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.emergencyContactName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Emergency Contact #
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.emergencyContactNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    2nd Emergency Contact Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.emergencyContactName2}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    2nd Emergency Contact #
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.emergencyContactNumber2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const AddressInfo = () => {
    return (
      <Fragment>
        <div className="border-gray-200 dark:border-gray-800 rounded-2xl border bg-white p-5 dark:bg-slate-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Permanent Address
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Country
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentCountry}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Region
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentRegionName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Province
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentProvinceName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Zip Code
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentZipCode}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    City/Municipility
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentCitymunName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Barangay
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentBrgyName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Street
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.permanentStreet}
                  </p>
                </div>
              </div>

              <h4 className="mt-3 text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Current Address
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Country
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentCountry}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Region
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentRegionName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Province
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentProvinceName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Zip Code
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentZipCode}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    City/Municipility
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentCitymunName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Barangay
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentBrgyName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Street
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.currentStreet}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const EducationalBg = () => {
    return (
      <Fragment>
        <div className="border-gray-200 dark:border-gray-800 rounded-2xl border bg-white p-5 dark:bg-slate-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Highschool/Seniorhigh School Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Academic Strand Grade 12
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.g12AcademicStrand}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Program Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.g12ProgramName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Award/Honor
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.g12AwardHonor}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Organization
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.g12Organization}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    School Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.g12SchoolName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Year of Graduation
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.g12YearOfGraduation}
                  </p>
                </div>
              </div>

              <h4 className="mt-3 text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                College School Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Program Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.collegeProgramName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Year Level
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.collegeYearLevel}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Award/Honor
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.collegeAwardHonor}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Organization
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.collegeOrganization}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    School Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.collegeSchoolName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    GWA
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.gwa}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const FamilyBg = () => {
    return (
      <Fragment>
        <div className="border-gray-200 dark:border-gray-800 rounded-2xl border bg-white p-5 dark:bg-slate-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-md mt-3 font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Father&apos;s Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.fatherFirstName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.fatherLastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Occupation
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.fatherOccupation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Mobile Number
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.fatherMobileNumber}
                  </p>
                </div>
              </div>

              <h4 className="text-md mt-3 font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Mother&apos;s Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.motherMaidenFirstName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.motherMaidenLastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Occupation
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.motherOccupation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Mobile Number
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.motherMobileNumber}
                  </p>
                </div>
              </div>

              <h4 className="text-md mt-3 font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Guardian&apos;s Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.guardianFirstName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.guardianLastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Occupation
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.guardianOccupation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Mobile Number
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.guardianMobileNumber}
                  </p>
                </div>
              </div>

              <h4 className="text-md mt-3 font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Other Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Number of Siblings
                  </p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                    {studentDetails.numberOfSiblings}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs leading-normal">
                    Siblings
                  </p>
                  {studentDetails.siblings?.map(
                    (sibling: SiblingRequest, index) => (
                      <p
                        key={index}
                        className="text-sm font-medium text-form-strokedark dark:text-white/90"
                      >
                        {sibling.siblingName}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const tabData = [
    { label: "Personal Information", content: <PersonalInfo /> },
    { label: "Address", content: <AddressInfo /> },
    { label: "Educational Background", content: <EducationalBg /> },
    { label: "Family Background", content: <FamilyBg /> },
  ];

  return (
    <>
      <div className="w-full">
        <div className="mb-5 flex flex-col items-start">
          {allowRouterBack && (
            <Button
              startIcon={<IoIosArrowRoundBack />}
              onClick={handleBack}
              variants={"text"}
            >
              Go Back
            </Button>
          )}
          <Tabs tabs={tabData} />
          <Button
            className="mt-5 self-end bg-primary"
            variants="default"
            onClick={() => onEdit()}
            startIcon={<CiEdit size={18} />}
          >
            Edit Student Profile
          </Button>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
