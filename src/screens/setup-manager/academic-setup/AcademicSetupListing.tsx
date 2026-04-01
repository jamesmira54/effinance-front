"use client";

import DataTable from "@/components/DataTable";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import AcademicSetupForm from "./AcademicSetupForm";
import Switch from "@/components/Inputs/Switch";
import { CiEdit } from "react-icons/ci";
import { APIAcademicYearProps } from "@/types";
import { useRouter } from "next/navigation";
import { AcademicAPIService } from "@/api";
import { FormattedDate } from "@/utils/helpers";
import { TableColumn } from "react-data-table-component";



const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const AcademicSetupListing: React.FC<{academics: APIAcademicYearProps[] }> = ({
    academics
}) => {


    const AcademicAPI = new AcademicAPIService();
    const [data, setData] = useState<APIAcademicYearProps[]>(academics || []);
    const [selectedItem, setSelectedItem] = useState<APIAcademicYearProps>({} as APIAcademicYearProps);
    const [pendingDelId, setPendingDelId] = useState<string | null>(null);
    

    const columns: TableColumn<APIAcademicYearProps>[] = useMemo(() => [
        { name: "Year Start", selector: (row: APIAcademicYearProps) => row.academicYearStart},
        { name: "Year End", selector: (row: APIAcademicYearProps) => row.academicYearEnd},
        { name: "School Term", selector: (row: APIAcademicYearProps) => row.schoolTerm},
        { name: "Date From	", selector: (row: APIAcademicYearProps) => FormattedDate(row.dateFrom), sortable: true },
        { name: "Date To	", selector: (row: APIAcademicYearProps) => FormattedDate(row.dateTo), sortable: true },
        { name: "Action", cell: (row: APIAcademicYearProps) => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => handleEdit(row)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => onDeleteWaring(row.id)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ], []);


    useEffect(() => {
        setData(academics || []);
    }, [academics]);

    const handleEdit = (item: APIAcademicYearProps) => {    
        setSelectedItem(item);
        setOpenFormModal(true);
    }

    const handAddNew = () => {
        setSelectedItem({} as APIAcademicYearProps);
        setOpenFormModal(true);
    }
    

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);


    const reFetchData = async () => {
        const res = await AcademicAPI.getAllAcademicYears();
        if (res) {
            setData(res || []);
        }
    }

    const handleSuccess = async (updateItem: APIAcademicYearProps) => {
        setSelectedItem(updateItem);
        await reFetchData();
        setTimeout(() => {
            setOpenFormModal(false);
        }, 1000);
    };


    
    const onDeleteWaring = async (fileId: string) => {
        setOpenActionModal(true);
        setPendingDelId(fileId);
    }

    const onConfirmDelete = async () => {
        if (pendingDelId) {
            
            setOpenActionModal(false);

            const response = await AcademicAPI.deleteAcademicYear(pendingDelId);
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
            <StyledModal isFullscreen={true} title="Academic Setup Form" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <AcademicSetupForm 
                    initialData={selectedItem}  
                    onSuccess={(item: APIAcademicYearProps) => 
                    handleSuccess(item)}
                />
            </StyledModal>

            <ActionModal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => setOpenActionModal(false)}>
                <div className="text-center">
                    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                    You will never revert this delete!
                    </p>

                    <div className="flex items-center justify-center w-full gap-6 mt-8">
                        <Button className="bg-primary" onClick={() => cancelDelete()}> Cancel </Button>
                        <Button onClickCapture={() => onConfirmDelete()} variants="default" className="bg-danger" onClick={() => {}}>Proceed</Button>
                    </div>
                </div>
            </ActionModal>
        </Fragment>
    )
};

export default AcademicSetupListing;