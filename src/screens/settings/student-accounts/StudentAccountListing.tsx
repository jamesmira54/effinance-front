"use client";

import DataTable from "@/components/DataTable";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { Fragment, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { APIStudentListResponse } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { TableColumn } from "react-data-table-component";

const ActionModal = styled(Modal)`

`;

const StudentAccountListing: React.FC<{studentAccounts: APIStudentListResponse[]}> = ({
    studentAccounts
}) => {

    const [data, setData] = useState<APIStudentListResponse[]>(studentAccounts || []);
    const router = useRouter();


    const columns: TableColumn<APIStudentListResponse>[] = useMemo(() => [
        { 
            name: "Full Name", 
            selector: (row: APIStudentListResponse) => row.lastName, 
            sortable: true,  
            cell: (row: APIStudentListResponse) => (
                <Link href={`/settings/student-accounts/view/${row.studentId}`} className="text-primary hover:underline">
                    {row.firstName}  {row.lastName}
                </Link>
            ),
        },
        { name: "Email", selector: (row: APIStudentListResponse) => row.email, width: "250px"},
        { name: "Gender", selector: (row: APIStudentListResponse) => row.sex},
        { name: "Phone #", selector: (row: APIStudentListResponse) => row.mobileNumber },
        { name: "Action", cell: (row: APIStudentListResponse) => (
            <>
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => router.push(`/settings/student-accounts/view/${row.studentId}`) } variants="text" startIcon={<FaRegEye size={22}/>}/>
                    <Button onClick={() => router.push(`/settings/student-accounts/edit/${row.studentId}`) } variants="text" startIcon={<FaEdit size={22}/>}/>
                </div>
            </>
        )},
    ], []);
    

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
        </Fragment>
    )
};

export default StudentAccountListing;