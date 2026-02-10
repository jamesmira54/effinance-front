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



const StudentProfile: React.FC<{studentDetails: APIStudentListResponse, allowRouterBack: boolean}> = ({
    studentDetails,
    allowRouterBack
  }) => {

  const router = useRouter();

  const handleBack = () => {
    if (allowRouterBack) {
      router.back();
    } 
  };


  const PersonalInfo = () => {
    return (
      <Fragment>
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.firstName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Middle Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.middleName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Last Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.lastName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.email}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Mobile Number</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.mobileNumber}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Gender</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.sex}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Birthdate</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{FormattedDate(studentDetails.birthdate)}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Birth Place</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.placeOfBirth}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Solo Parent</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.isSoloParent ? 'YES' : 'NO'}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Child of Solo Parent</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.isChildOfSoloParent ? 'YES' : 'NO'}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Member of Indigenous People</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.isIndigenousPeople ? 'YES' : 'NO'}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">SPED</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.isSped ? 'YES' : 'NO'}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">PWD</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.isPwd ? 'YES' : 'NO'}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Emergency Contact Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.emergencyContactName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Emergency Contact #</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.emergencyContactNumber}</p>
                </div>  
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">2nd Emergency Contact Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.emergencyContactName2}</p>
                </div> 
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">2nd Emergency Contact #</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.emergencyContactNumber2}</p>
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
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Permanent Address
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Country</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentCountry}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Region</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentRegionName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Province</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentProvinceName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Zip Code</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentZipCode}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">City/Municipility</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentCitymunName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Barangay</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentBrgyName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Street</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.permanentStreet}</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6 mt-3">
                Current Address
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Country</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentCountry}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Region</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentRegionName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Province</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentProvinceName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Zip Code</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentZipCode}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">City/Municipility</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentCitymunName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Barangay</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentBrgyName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Street</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.currentStreet}</p>
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
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
                Highschool/Seniorhigh School Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Academic Strand Grade 12</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.g12AcademicStrand}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Program Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.g12ProgramName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Award/Honor</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.g12AwardHonor}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Organization</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.g12Organization}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">School Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.g12SchoolName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Year of Graduation</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.g12YearOfGraduation}</p>
                </div>
              </div>


              <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6 mt-3">
                College School Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Program Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.collegeProgramName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Year Level</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.collegeYearLevel}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Award/Honor</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.collegeAwardHonor}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Organization</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.collegeOrganization}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">School Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.collegeSchoolName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">GWA</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.gwa}</p>
                </div>
              </div>

            </div>
          </div>
        </div>  
      </Fragment>
    );
  }

  const FamilyBg = () => {
    return (
      <Fragment>
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>

              <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 mt-3 lg:mb-6">
                Father's Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.fatherFirstName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Last Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.fatherLastName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Occupation</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.fatherOccupation}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Mobile Number</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.fatherMobileNumber}</p>
                </div>
              </div>

              <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 lg:mb-6 mt-3">
                Mother's Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.motherMaidenFirstName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Last Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.motherMaidenLastName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Occupation</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.motherOccupation}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Mobile Number</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.motherMobileNumber}</p>
                </div>
              </div>

              <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 mt-3 lg:mb-6">
                Guardian's Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.guardianFirstName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Last Name</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.guardianLastName}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Occupation</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.guardianOccupation}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Mobile Number</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.guardianMobileNumber}</p>
                </div>
              </div>

              <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 mt-3 lg:mb-6">
              Other Information:
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Number of Siblings</p>
                  <p className="text-sm font-medium text-form-strokedark dark:text-white/90">{studentDetails.numberOfSiblings}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Siblings</p>
                  {studentDetails.siblings?.map((sibling: SiblingRequest, index) => (
                    <p key={index} className="text-sm font-medium text-form-strokedark dark:text-white/90">{sibling.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  const tabData = [
    { label: "Personal Information", content: <PersonalInfo/> },
    { label: "Address", content: <AddressInfo/> },
    { label: "Educational Background", content: <EducationalBg/> },
    { label: "Family Background", content: <FamilyBg/> },
  ];
  
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-start">
          {allowRouterBack && <Button startIcon={<IoIosArrowRoundBack/>} onClick={handleBack} variants={'text'}>Back</Button> }
          <Button className="self-end bg-primary" variants="default" onClick={() => router.push(`/settings/student-accounts/edit/${studentDetails.studentId}`)} startIcon={<CiEdit size={18}/>}>Edit Student Profile</Button>
          <Tabs tabs={tabData} />
        </div>
      </div>
      {/* <Modal   
        isFullscreen={true} 
        title="Edit Personal & Family Background Information" 
        className="max-w-230" 
        isOpen={isOpen} 
        onClose={() => setOpenModal(false)}
      >
        <StudentProfileForm/>
      </Modal> */}
    </>
  );
};

export default StudentProfile;
