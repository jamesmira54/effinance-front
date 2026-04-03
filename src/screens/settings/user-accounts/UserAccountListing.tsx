"use client";

import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import UserAccountForm from "./UserAccountForm";
import { APIUserListResponse, APIUserProfileResponse, APIUserRoles } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const UserAccountListing: React.FC<{userAccounts: APIUserListResponse, roles: APIUserRoles[]}> = ({
    userAccounts,
    roles
}) => {

    const [data, setData] = useState<APIUserProfileResponse[]>(userAccounts?.users || []);

    useEffect(() => {
        setData(userAccounts?.users || []);
    }, [userAccounts.users]);

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const router = useRouter();


    const columns: TableColumn<APIUserProfileResponse>[] = useMemo(() => [
        { 
            name: "Username", 
            selector: (row: APIUserProfileResponse) => row.username, 
            sortable: true,  
            cell: (row: APIUserProfileResponse) => (
                <Link href={`/settings/user-accounts/${row.userId}`} className="text-primary hover:underline">
                    {row.username}
                </Link>
            ),
        },
        { name: "First Name", selector: (row: APIUserProfileResponse) => row.firstName ?? "", sortable: true },
        { name: "Middle Name", selector: (row: APIUserProfileResponse) => row.middleName ?? "", sortable: true },
        { name: "Last Name	", selector: (row: APIUserProfileResponse) => row.lastName ?? "", sortable: true },
        { name: "Email", selector: (row: APIUserProfileResponse) => row.email ?? "", width: "250px"},
        { name: "Phone #", selector: (row: APIUserProfileResponse) => row.mobileNumber ?? "" },
        { name: "Role", selector: (row: APIUserProfileResponse) => row.userType ?? "", sortable: true },
        { name: "Action", cell: (row: APIUserProfileResponse) => (
            <>
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => router.push(`/settings/user-accounts/${row.userId}`) } variants="text" startIcon={<FaRegEye size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
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
              <Button onClick={() => setOpenFormModal(true)} style={{marginTop: '20px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal isFullscreen={true} title="Add New User" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <UserAccountForm onClose={() => setOpenFormModal(false)} roles={roles}/>
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