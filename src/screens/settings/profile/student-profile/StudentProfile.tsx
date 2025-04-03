"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import { CiEdit } from "react-icons/ci";
import Button from "@/components/Button";
import StudentProfileForm from "./StudentProfileForm";
import Tabs from "@/components/Tabs";


export default function UserInfoCard() {
  const [isOpen, setOpenModal] = useState<boolean>(false);

  const tabData = [
    { label: "Home", content: <p>Welcome to the Home tab!</p> },
    { label: "Profile", content: <p>View your profile here.</p> },
    { label: "Settings", content: <p>Adjust your settings here.</p> },
  ];
  
  return (
    <>
      <div className="w-[80%]">
        <div className="flex flex-col items-start">
          <Tabs tabs={tabData} />
        </div>
      </div>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
              Student Personal & Family Background Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Age</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">21 </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Gender</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90"> Male </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Birthdate</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">06/01/1999</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Primary Address</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Secondary Address</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">School</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Test School</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">School Year</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">3rd</p>
              </div>
            </div>

            <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 mt-3 lg:mb-6">
              Father's Information:
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">First Name </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Middle Name</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Middle Name</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Last Name</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Last Name</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Age</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">55</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Birthdate</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">09/20/1987</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Occupation</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Occupation Test</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Income</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Income Test</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">0934284527494</p>
              </div>
            </div>

            <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 mt-3 lg:mb-6">
              Mother's Information:
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">First Name </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Middle Name</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Middle Name</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Last Name</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Last Name</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Age</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">55</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Birthdate</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">09/20/1987</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Occupation</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Occupation Test</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Income</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Income Test</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">0934284527494</p>
              </div>
            </div>

            <h4 className="text-md font-semibold text-form-strokedark dark:text-white/90 mt-3 lg:mb-6">
            Other Information:
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Number of Siblings</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">4</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Siblings</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Sibling 1</p>
                <p className="text-sm font-medium text-form-strokedark dark:text-white/90">Sibling 2</p>
              </div>
            </div>


          </div>

          <Button variants="text" onClick={() => setOpenModal(true)} startIcon={<CiEdit size={18}/>}>Edit</Button>
        </div>

          <Modal   
            isFullscreen={true} 
            title="Edit Personal & Family Background Information" 
            className="max-w-230" 
            isOpen={isOpen} 
            onClose={() => setOpenModal(false)}
          >
            <StudentProfileForm/>
          </Modal>
      </div>
    </>
  );
}
