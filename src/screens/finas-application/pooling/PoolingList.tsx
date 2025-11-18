"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { CiEdit } from "react-icons/ci";
import { SponsorshipApplicationResponse, SponsorshipRequirements, SponsorshipSchoolProps } from "@/types/sponsorship.types";
import { FormattedDate } from "@/utils/helpers";
import { FaRegEye } from "react-icons/fa6";

const ActionModal = styled(Modal)`

`;

const StyledModal = styled(Modal)`
    overflow: auto;
`;


interface serverDataProps {
    applications: SponsorshipApplicationResponse[];
    totalCount: number;
}

const PoolingList: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {
    
    const [data, setData] = useState<SponsorshipApplicationResponse[]>(serverData.applications || []);

    useEffect(() => {
        setData(serverData.applications || []);
    }, [serverData.applications]);

    const columns = [
        { name: "Application Number", selector: (row:SponsorshipApplicationResponse) => row.appNumber, sortable: true },
        { name: "Applicants Name", selector: (row:SponsorshipApplicationResponse) => row.applicantName, sortable: true },
        { name: "Schools", center: true, cell: (row:any) => (
            <>
                <Button onClick={() => getSchools('srte') } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </>
        )},
        { name: "Finas Applied", selector: (row:SponsorshipApplicationResponse) => row.finAssname, sortable: true },
        { name: "Date of Application", selector: (row:SponsorshipApplicationResponse) => FormattedDate(row.dateOfApp), sortable: true },
        { name: "Attachments", center: true, cell: (row:any) => (
            <>
                <Button onClick={() => getAttachments('srte') } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </>
        )},
        { name: "Action", cell: () => (
            <>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => setOpenFormModal(true)} variants="text" startIcon={<CiEdit size={22}/>}/>
                    <Button onClick={() => setOpenActionModal(true)} variants="text" startIcon={<RiDeleteBin5Line size={20}/>}/>
                </div>
            </>
        )},
    ];

    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [selectedSchools, setSelectedSchools] = useState<SponsorshipSchoolProps[]>([]);
    const [selectedReqs, setSelectedReqs] = useState<SponsorshipRequirements[]>([]);
    const [openSchoolsModal, setOpenSchoolsModal] = useState<boolean>(false);

    const getSchools = async(sponsorshipId: string) => {
        const schoolData = await [ { schoolId: "1", schoolName: "School A" }, { schoolId: "2", schoolName: "School B" } ];
        if(schoolData) {
            setSelectedSchools(schoolData);
            setOpenSchoolsModal(true);
        }
    };


    const getAttachments = async(studentId: string) => {
        const reqData = await [ { fileId: "1", fileName: "School A" }, { fileId: "2", fileName: "School B" } ];
        if(reqData) {
            setSelectedReqs(reqData);
            setOpenReqModal(true);
        }
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


            <StyledModal isFullscreen={false} title="Attachments" className="min-w-125" isOpen={openReqModal} onClose={() => setOpenReqModal(false)}>
                <ul className="flex flex-col gap-4">
                    {selectedReqs.map((item: SponsorshipRequirements, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{index + 1}. {item.fileName}</span>
                        </li>
                    ))}
                </ul>
            </StyledModal>


            <StyledModal isFullscreen={false} title="Schools" className="min-w-125" isOpen={openSchoolsModal} onClose={() => setOpenSchoolsModal(false)}>
                <ul className="flex flex-col gap-4">
                    {selectedSchools.map((item: SponsorshipSchoolProps, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{index + 1}. {item.schoolName}</span>
                        </li>
                    ))}
                </ul>
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

export default PoolingList;