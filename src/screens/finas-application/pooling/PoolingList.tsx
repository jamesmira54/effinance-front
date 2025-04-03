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

const ActionModal = styled(Modal)`

`;

const PoolingList: React.FC = () => {
    

    const columns = [
        { name: "Application Number", selector: (row:any) => row.applicationNumber, sortable: true },
        { name: "Application Name", selector: (row:any) => row.applicationName, sortable: true },
        { name: "School", selector: (row:any) => row.school, sortable: true },
        { name: "Finas Applied", selector: (row:any) => row.finasApplied, sortable: true },
        { name: "Date of Application", selector: (row:any) => row.dateOfApplication, sortable: true },
        { name: "Attachments", selector: (row:any) => row.attachments, sortable: true },
        { name: "Action", cell: () => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
        { name: "Accepted", selector: (row:any) => row.accepted, sortable: true },
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

export default PoolingList;