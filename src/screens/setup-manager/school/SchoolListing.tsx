"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import SchoolForm from "./SchoolForm";
import { CiEdit } from "react-icons/ci";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const SchoolListing: React.FC = () => {
    

    const columns = [
        { name: "School Name	", selector: (row:any) => row.schoolName, sortable: true },
        { name: "School Type	", selector: (row:any) => row.schoolType, sortable: true },
        { name: "Province", selector: (row:any) => row.province, sortable: true },
        { name: "City	", selector: (row:any) => row.city, sortable: true },
        { name: "Municipality	", selector: (row:any) => row.municipality, sortable: true },
        { name: "Barangay	", selector: (row:any) => row.barangay, sortable: true },
        { name: "Action", cell: (row:any) => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ];


    const data = [
        { id: 1, schoolName: "Camiguin HS", schoolType: "Public School", province: "CAMIGUIN", city: "EL SALVADOR", municipality: "GUINSILIBAN", barangay:  "Cabuan", action: 'Action' },
        { id: 2, schoolName: "TESTs", schoolType: "Private School", province: "BUKIDNON", city: "EL SALVADOR", municipality: "ALUBIJID", barangay:  "Benigwayan", action: 'Action' },
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
            <StyledModal 
                isFullscreen={true} 
                title="School Form" 
                className="max-w-180" 
                isOpen={openFormModal} 
                onClose={() => setOpenFormModal(false)}
            >
                <SchoolForm/>
            </StyledModal>

            <ActionModal 
                isTextCentered={true} 
                title="Are you Sure?" 
                className="max-w-100" 
                isOpen={openActionModal} 
                onClose={() => setOpenActionModal(false)}
            >
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

export default SchoolListing;