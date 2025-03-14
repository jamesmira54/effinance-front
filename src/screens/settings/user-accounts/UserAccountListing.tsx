"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import UserAccountForm from "./UserAccountForm";
import { CiEdit } from "react-icons/ci";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const UserAccountListing: React.FC = () => {

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);


    const columns = [
        { name: "First Name", selector: (row:any) => row.firstname, sortable: true },
        { name: "Middle Name	", selector: (row:any) => row.middlename, sortable: true },
        { name: "Last Name	", selector: (row:any) => row.lastname, sortable: true },
        { name: "Email", selector: (row:any) => row.email, width: "250px"},
        { name: "Phone #", selector: (row:any) => row.phoneNumber },
        { name: "Role", selector: (row:any) => row.role, sortable: true },
        { name: "Action", cell: (row:any) => (
            <>
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ];
    
    
    const data = [
        { id: 1, firstname: "Britanney", middlename: "Morales", lastname: "Mullins", email: "viquma@mailinator.com", phoneNumber: "12345678901", role: "System Admin"},
        { id: 2, firstname: "Claudia", middlename: "Sosa", lastname: "Johnson", email: "student_claudia@yopmail.com", phoneNumber: "09111111117", role: "Student"},
        { id: 3, firstname: "Frances", middlename: "Turner", lastname: "Flores", email: "mapecuzy@mailinator.com", phoneNumber: "12345678909", role: "Sponsor"},
    ];
    

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
            <StyledModal isFullscreen={true} title="Add New User" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <UserAccountForm/>
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

export default UserAccountListing;