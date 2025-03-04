"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import AcademicSetupForm from "./AcademicSetupForm";
import Switch from "@/components/Inputs/Switch";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const AcademicSetupListing: React.FC = () => {
    

    const columns = [
        { name: "Academic Year & Term", selector: (row:any) => row.academicYear, sortable: true },
        { name: "Date Covered	", selector: (row:any) => row.dateCovered },
        { name: "Status", cell: (row:any) => (
            <>
                <Switch variant="style2"/>
            </>
        )},
        { name: "Action", cell: (row:any) => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<IoEyeOutline size={21}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={21}/>}/>
                </div>
            </>
        )},
    ];


    const data = [
        { id: 1, academicYear: "2022-2023 - 2nd Semester", dateCovered: "06-01-2023 - 07-31-2023", status: "Active", action: 'Lock' },
        { id: 2, academicYear: "2022-2023 - 1st Semester", dateCovered: "04-01-2023 - 05-31-2023", status: "Active", action: 'Lock' },
    ];
    

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="max-w-full overflow-x-auto">
              <Breadcrumb pageName="Acadamic Setup" />
              <DataTable 
                  columns={columns} 
                  data={data} 
                  pagination 
                  highlightOnHover 
                  striped
              />
              <Button onClick={() => setOpenFormModal(true)} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal isFullscreen={true} title="Academic Setup Form" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <AcademicSetupForm/>
            </StyledModal>

            <ActionModal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => setOpenActionModal(false)}>
                <div className="text-center">
                    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque euismod est quis mauris lacinia pharetra.
                    </p>

                    <div className="flex items-center justify-center w-full gap-6 mt-8">
                        <Button className="bg-primary" onClick={() => setOpenActionModal(false)}>
                            Cancel
                        </Button>
                        <Button className="bg-danger" onClick={() => {}}>Proceed</Button>
                    </div>
                </div>
            </ActionModal>
        </Fragment>
    )
};

export default AcademicSetupListing;