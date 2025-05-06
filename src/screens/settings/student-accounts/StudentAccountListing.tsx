"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { APIStudentListResponse } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const ActionModal = styled(Modal)`

`;

const StudentAccountListing: React.FC<{studentAccounts: APIStudentListResponse[]}> = ({
    studentAccounts
}) => {

    const [data, setData] = useState<APIStudentListResponse[]>(studentAccounts || []);

    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const router = useRouter();


    const columns = [
        { 
            name: "Full Name", 
            selector: (row:any) => row.lastName, 
            sortable: true,  
            cell: (row: any) => (
                <Link href={`/settings/student-accounts/view/${row.studentId}`} className="text-primary hover:underline">
                    {row.firstName}  {row.lastName}
                </Link>
            ),
        },
        { name: "Email", selector: (row:any) => row.email, width: "250px"},
        { name: "Gender", selector: (row:any) => row.sex},
        { name: "Phone #", selector: (row:any) => row.mobileNumber },
        { name: "Action", cell: (row:any) => (
            <>
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => router.push(`/settings/student-accounts/view/${row.studentId}`) } variants="text" startIcon={<FaRegEye size={22}/>}/>
                    <Button onClick={() => router.push(`/settings/student-accounts/edit/${row.studentId}`) } variants="text" startIcon={<FaEdit size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
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
            </div>

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

export default StudentAccountListing;