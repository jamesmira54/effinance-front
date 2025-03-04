"use client";

import DataTable, { TableStyles } from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import SponsorshipForm from "./SponsorshipForm";


const columns = [
    { name: "Financial Assistance Name", selector: (row:any) => row.FCName, sortable: true },
    { name: "Sponsor	", selector: (row:any) => row.sponsor },
    { name: "Duration", selector: (row:any) => row.duration },
    { name: "Fund Allocation", selector: (row:any) => row.fundAllocation },
    { name: "Status", selector: (row:any) => row.status },
    { name: "Requirements", selector: (row:any) => row.requirements },
    { name: "Schools", selector: (row:any) => row.schools },
    { name: "Action", cell: (row:any) => (
        <>
            <div className="flex items-center space-x-3.5">
                    <Button variants="text" startIcon={<IoEyeOutline size={18}/>}/>
                    <Button variants="text" startIcon={<RiDeleteBin5Line size={18}/>}/>
                  </div>
        </>
    )},
];


const data = [
    { id: 1, FCName: "New Sponsor", sponsor: "Alyssa1 Doe Rice", duration: "January 01 - April 27, 2024	", fundAllocation: "2000", status: "Active", requirements: "", schools: "", action: 'Lock' },
    { id: 2, FCName: "New Sponsor 2", sponsor: "Alyssa1 Doe Rice 2", duration: "January 01 - April 27, 2024	", fundAllocation: "2000", status: "Active", requirements: "", schools: "", action: 'Lock' },
];


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const SponsorshipListing: React.FC = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="max-w-full overflow-x-auto">
              <Breadcrumb pageName="Sponsorships" />
              <DataTable 
                  columns={columns} 
                  data={data} 
                  pagination 
                  highlightOnHover 
                  striped
              />
              <Button onClick={() => setOpenModal(true)} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal isFullscreen={true} title="Academic Setup Form" className="max-w-180" isOpen={openModal} onClose={() => setOpenModal(false)}>
                <SponsorshipForm/>
            </StyledModal>
        </Fragment>
    )
};

export default SponsorshipListing;