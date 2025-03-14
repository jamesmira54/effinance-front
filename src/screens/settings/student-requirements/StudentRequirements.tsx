"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { CiEdit } from "react-icons/ci";
import StudentRequirementsForm from "./StudentRequirementsForm";
import { IoEyeOutline } from "react-icons/io5";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const StudentRequirements: React.FC = () => {
    

    const columns = [
        { name: "Requirement", selector: (row:any) => row.requirement, sortable: true },
        { name: "Filename", selector: (row:any) => row.filename },
        { name: "File Type", selector: (row:any) => row.fileType },
        { name: "Action", cell: (row:any) => (
            <>
                <div className="flex items-center space-x-4">
                    <Button variants="text" startIcon={<IoEyeOutline size={21}/>}/>
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<CiEdit size={21}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ];


    const data = [
        { id: 1, requirement: "GWA Certification", filename: "gwa.jpeg", fileType: "JPEG", action: 'Action' },
        { id: 2, requirement: "Certificate of Residency", filename: "cert.pdf", fileType: "PDF", action: 'Action' },
    ];
    
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="max-w-full overflow-x-auto">
              <DataTable 
                  columns={columns} 
                  data={data} 
                  pagination 
                  highlightOnHover 
                  striped
              />
              <Button onClick={() => setOpenFormModal(true)} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal isFullscreen={true} title="Requirement Form" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <StudentRequirementsForm/>
            </StyledModal>

            <ActionModal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => setOpenActionModal(false)}>
                <div className="text-center">
                    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque euismod est quis mauris lacinia pharetra.
                    </p>

                    <div className="flex items-center justify-center w-full gap-6 mt-8">
                        <Button className="bg-primary" onClick={() => setOpenActionModal(false)}> Cancel </Button>
                        <Button variants="default" className="bg-danger" onClick={() => {}}>Proceed</Button>
                    </div>
                </div>
            </ActionModal>
        </Fragment>
    )
};

export default StudentRequirements;