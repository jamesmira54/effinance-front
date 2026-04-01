"use client";

import DataTable from "@/components/DataTable";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { CiEdit } from "react-icons/ci";
import StudentRequirementsForm from "./StudentRequirementsForm";
import { IoEyeOutline } from "react-icons/io5";
import { APIFileTypesRes, APIStudentFilesRes } from "@/types";
import { UploadAPIService } from "@/api";
import { TableColumn } from "react-data-table-component";


const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

const StudentRequirements: React.FC<{fileTypes: APIFileTypesRes, studentId: string, files: APIStudentFilesRes[]}> = ({
    fileTypes,
    studentId,
    files
}) => {
    
    const uploadAPI = new UploadAPIService();
    

    const columns: TableColumn<APIStudentFilesRes>[] = useMemo(() => [
        { name: "Requirement", selector: (row: APIStudentFilesRes) => row.filetype, sortable: true },
        { name: "Filename", selector: (row: APIStudentFilesRes) => row.filename },
        { name: "Action", cell: (row: APIStudentFilesRes) => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => openFile(row.filename)} variants="text" startIcon={<IoEyeOutline size={21}/>}/>
                    <Button onClick={() => onDeleteWaring(row.id)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ], []);

    const openFile = (fileUrl: string) => {
        window.open(`${process.env.NEXT_PUBLIC_API_URL}/uploads/docs/${fileUrl}`, "_blank", "noopener,noreferrer");
    }


    const [data, setData] = useState<APIStudentFilesRes[]>(files || []);

    useEffect(() => {
        setData(files || []);
    }, [files]);

    
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const [pendingId, setPendingId] = useState<string | null>(null);


    const onDeleteWaring = async (fileId: string) => {
        setOpenActionModal(true);
        setPendingId(fileId);
    }

    const onConfirmDelete = async () => {
        if (pendingId) {
            
            setOpenActionModal(false);

            const response = await uploadAPI.deleteFile(pendingId);
            if (response) {
                setData((prevData) => prevData.filter((item) => item.id !== pendingId));
                setPendingId(null);
            }
        }
    }

    const cancelDelete = () => {
        setOpenActionModal(false);
        setPendingId(null);
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
              <Button onClick={() => setOpenFormModal(true)} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal isFullscreen={true} title="Requirement Form" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <StudentRequirementsForm requirements={fileTypes.fileTypes} studentId={studentId}/>
            </StyledModal>

            <ActionModal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => cancelDelete()}>
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

export default StudentRequirements;