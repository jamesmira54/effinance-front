"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import SponsorshipForm from "./SponsorshipForm";
import { CiEdit } from "react-icons/ci";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const SponsorshipListing: React.FC = () => {

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);


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
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ];
    
    
    const data = [
        { id: 1, FCName: "New Sponsor", sponsor: "Alyssa1 Doe Rice", duration: "January 01 - April 27, 2024	", fundAllocation: "2000", status: "Active", requirements: "", schools: "", action: 'Lock' },
        { id: 2, FCName: "New Sponsor 2", sponsor: "Alyssa1 Doe Rice 2", duration: "January 01 - April 27, 2024	", fundAllocation: "2000", status: "Active", requirements: "", schools: "", action: 'Lock' },
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
            <StyledModal isFullscreen={true} title="Sponsorship Form" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <SponsorshipForm/>
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

export default SponsorshipListing;