"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import MainProfileForm from "./MainProfileForm";
import Button from "@/components/Button";
import { CiEdit } from "react-icons/ci";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";


export default function UserInfoCard() {
    const [isOpen, setOpenModal] = useState<boolean>(false);

  
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-[80%]">
          <h4 className="text-lg font-semibold text-form-strokedark dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">First Name</p>
              <p className="text-sm font-medium text-form-strokedark dark:text-white"> Musharof </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Middle Name </p>
              <p className="text-sm font-medium text-form-strokedark dark:text-white/90"> Test </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Last Name </p>
              <p className="text-sm font-medium text-form-strokedark dark:text-white/90">
                Chowdhury
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Email address </p>
              <p className="text-sm font-medium text-form-strokedark dark:text-white/90"> randomuser@pimjo.com </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Phone </p>
              <p className="text-sm font-medium text-form-strokedark dark:text-white/90"> +09 363 398 46 </p>
            </div>
          </div>
        </div>

        <Button variants="text" onClick={() => setOpenModal(true)} startIcon={<CiEdit size={18}/>}>Edit</Button>
      </div>

      <Modal 
          isFullscreen={true} 
          title="Edit Profile" 
          className="max-w-180" 
          isOpen={isOpen} 
          onClose={() => setOpenModal(false)}
      >
          <MainProfileForm/>
      </Modal>
    </div>
  );
}
