"use client";

import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { SponsorshipApplicationResponse } from "@/types/sponsorship.types";
import { FormattedDate } from "@/utils/helpers";
import { FaRegEye } from "react-icons/fa6";
import StudentAPIService from "@/api/student-api";
import { IoEyeOutline } from "react-icons/io5";
import Badge from "@/components/Badge/Badge";
import { APIStudentFilesRes } from "@/types";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";

const StyledModal = styled(Modal)`
    overflow: auto;
    width: 500px;
`;


interface serverDataProps {
    applications: SponsorshipApplicationResponse[];
    totalCount: number;
}

const FinasProperList: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {
    
    const StudentAPI = new StudentAPIService();
    const SponsorshipStudentAPI = new SponsorshipStudentAPIService();
    const [data, setData] = useState<SponsorshipApplicationResponse[]>(serverData.applications || []);

    useEffect(() => {
        setData(serverData.applications || []);
    }, [serverData.applications]);

    const columns: TableColumn<SponsorshipApplicationResponse>[] = useMemo(() => [
        { name: "Application #", selector: (row:SponsorshipApplicationResponse) => row.appNumber, sortable: true },
        {
            name: "Applicants Name", 
            selector: (row:SponsorshipApplicationResponse) => row.applicantName, 
            sortable: true,  
            cell: (row: SponsorshipApplicationResponse) => (
                <Link href={`/settings/student-accounts/view/${row.studentId}`} className="text-primary hover:underline">
                    {row.applicantName}
                </Link>
            ),
        },
        { name: "Finas Applied", selector: (row:SponsorshipApplicationResponse) => row.finAssname, sortable: true },
        { name: "Date of Application", selector: (row:SponsorshipApplicationResponse) => FormattedDate(row.dateOfApp), sortable: true },
        { name: <div className="flex justify-center w-full">Attachments</div>, cell: (row:any) => (
            <div className="flex justify-center w-full">
                <Button onClick={() => getAttachments(row.studentId) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </div>
        )},
        { name: <div className="flex justify-center w-full">Status</div>, cell: (row:any) => ( 
            <div className="flex justify-center w-full">
                <Badge variants={ "success" }>
                        {row.appStatus
                            .toLowerCase()
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (char: string) => char.toUpperCase())
                        }
                </Badge> 
            </div>
        )},
        { name: <div className="flex justify-center w-full">Remarks</div>, cell: (row:any) => (
            <div className="flex justify-center w-full">
                <Button onClick={() => getRemarks(row.sponsorshipId) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </div>
        )},
    ], []);

    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [selectedReqs, setSelectedReqs] = useState<APIStudentFilesRes[]>([]);
    const [remarks, setRemarks] = useState<string>("");
    const [openRemarksModal, setOpenRemarksModal] = useState<boolean>(false);



    const getAttachments = async(studentId: string) => {
        const reqData = await StudentAPI.getStudentFiles(studentId);
        if(reqData) {
            setSelectedReqs(reqData);
            setOpenReqModal(true);
        }
    };

    const getRemarks = async(sponsorshipId: string) => {
        const remarksData = await SponsorshipStudentAPI.getSpecificSponsorship(sponsorshipId);
        if(remarksData) {
            setRemarks(remarksData.sponsorshipRemarks || "No remarks available.");
            setOpenRemarksModal(true);
        }
    }

    const openFile = (filename: string) => {
        window.open(`${process.env.NEXT_PUBLIC_API_URL}/uploads/docs/${filename}`, "_blank", "noopener,noreferrer");
    }

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


            <StyledModal isFullscreen={false} title="Attachments" className="min-w-125" isOpen={openReqModal} onClose={() => setOpenReqModal(false)}>
                <ul className="flex flex-col gap-4">
                    {selectedReqs.map((item: APIStudentFilesRes, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <Button onClick={() => openFile(item.filename)} variants="text" startIcon={<IoEyeOutline size={21}/>}>
                                {index + 1}. {item.filetype}
                            </Button>
                        </li>
                    ))}
                </ul>
            </StyledModal>

            <StyledModal isFullscreen={false} title="Remarks" className="max-w-180" isOpen={openRemarksModal} onClose={() => setOpenRemarksModal(false)}>
                <textarea
                    rows={6}
                    style={{ resize: "none" }}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                    value={remarks}
                    name="remarks"
                ></textarea>
                <div className="flex justify-end mt-5">
                    <input
                        type="button"
                        value={`Close`}
                        className="w-50 cursor-pointer rounded-lg border bg-warning p-4 text-white transition hover:bg-opacity-90 mt-10"
                        onClick={() => setOpenRemarksModal(false)} 
                    />
                </div>
            </StyledModal>
            


        </Fragment>
    )
};

export default FinasProperList;