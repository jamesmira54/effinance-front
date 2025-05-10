"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import SchoolForm from "./SchoolForm";
import { CiEdit } from "react-icons/ci";
import { ProvinceProps, SchoolDataProps } from "./School.types";
import { SchoolAPIService } from "@/api";
import { APISchoolPayload } from "@/types/shools.types";
import { useRouter } from "next/navigation";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

interface serverDataProps {
    provinces: ProvinceProps[];
    schools: SchoolDataProps[];
}

const SchoolListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {

    const schoolAPI = new SchoolAPIService();
    const [data, setData] = useState<SchoolDataProps[]>(serverData.schools || []);
    const [selectedItem, setSelectedItem] = useState<SchoolDataProps>({} as SchoolDataProps);
    const [pendingDelId, setPendingDelId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setData(serverData.schools || []);
    }, [serverData.schools]);
    

    const columns = [
        { name: "School Name	", selector: (row:any) => row.name, sortable: true },
        { name: "Province", selector: (row:any) => row.provinceName, sortable: true },
        { name: "City/Municipality", selector: (row:any) => row.cityMunName, sortable: true },
        { name: "Barangay	", selector: (row:any) => row.brgyName, sortable: true },
        { name: "School Type	", selector: (row:any) => getSchoolType(row.schoolType), sortable: true },
        { name: "Action", cell: (row:any) => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => handleEdit(row)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => onDeleteWaring(row.id)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ];
    

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);

    const getSchoolType = (schoolType: string) => {
        switch (schoolType) {
            case 'public':
                return 'Public';
            case 'private':
                return 'Private';
            case 'international':
                return 'International';
            default:
                return schoolType;
        }
    }

    const handAddNew = () => {
        setSelectedItem({} as SchoolDataProps);
        setOpenFormModal(true);
    }


    const handleEdit = (item: SchoolDataProps) => {    
        setSelectedItem(item);
        setOpenFormModal(true);
    }

    const onDeleteWaring = async (fileId: string) => {
        setOpenActionModal(true);
        setPendingDelId(fileId);
    }

    const onConfirmDelete = async () => {
        if (pendingDelId) {
            
            setOpenActionModal(false);

            const response = await schoolAPI.deleteSchool(pendingDelId);
            if (response) {
                setData((prevData) => prevData.filter((item) => item.id !== pendingDelId));
                setPendingDelId(null);
            }
        }
    }


    const cancelDelete = () => {
        setOpenActionModal(false);
        setPendingDelId(null);
    };

     const handleSuccess = (updateItem: SchoolDataProps) => {
        setSelectedItem(updateItem)
        router.refresh();
    };


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
              <Button onClick={() => handAddNew()} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal 
                isFullscreen={true} 
                title="School Form" 
                className="max-w-180" 
                isOpen={openFormModal} 
                onClose={() => setOpenFormModal(false)}
            >
                <SchoolForm initialData={selectedItem} provinces={serverData.provinces} onSuccess={(item: SchoolDataProps) => handleSuccess(item)}/>
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
                        You will never revert this delete!
                    </p>

                    <div className="flex items-center justify-center w-full gap-6 mt-8">
                        <Button className="bg-primary" onClick={() => cancelDelete()}>
                            Cancel
                        </Button>
                        <Button className="bg-danger" onClick={() => onConfirmDelete()}>Proceed</Button>
                    </div>
                </div>
            </ActionModal>
        </Fragment>
    )
};

export default SchoolListing;