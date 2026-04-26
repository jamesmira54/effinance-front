"use client";

import type { TableColumn } from 'react-data-table-component';
import Button from "@/components/Button";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { APIAcademicYearProps, APIFileTypesProps, APIUserProfileResponse } from "@/types";
import { SchoolListProps } from "@/types/shools.types";
import { APISponsorshipListResponse, SponsorshipRequirements, SponsorshipSchoolProps } from "@/types/sponsorship.types";
import { formatCurrency, FormattedDate } from "@/utils/helpers";
import { FaRegEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { BsClipboard2DataFill } from "react-icons/bs";
import DataTable from "@/components/DataTable";
import { usePathname } from "next/navigation";
import { useLoader } from '@/context/LoaderContext';




const StyledModal = styled(Modal)`
    overflow: auto;
`;

interface serverDataProps {
    coordinators: APIUserProfileResponse[];
    schools: SchoolListProps[];
    requirements: APIFileTypesProps[];
    academicYears: APIAcademicYearProps[];
    sponsorships: APISponsorshipListResponse[];
}

const RankingStudentListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {
    
    const { showLoader } = useLoader();
    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [openSchoolsModal, setOpenSchoolsModal] = useState<boolean>(false);
    const [data, setData] = useState<APISponsorshipListResponse[]>(serverData.sponsorships || []);
    const [selectedReqs, setSelectedReqs] = useState<SponsorshipRequirements[]>([]);
    const [selectedSchools, setSelectedSchools] = useState<SponsorshipSchoolProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        setData(serverData.sponsorships || []);
    }, [serverData.sponsorships]);


    const columns: TableColumn<APISponsorshipListResponse>[] = useMemo(() => [
        { name: "Financial Assistance Name", selector: (row:APISponsorshipListResponse) => row.name, sortable: true },
        { name: "Sponsor", selector: (row:APISponsorshipListResponse) => row.sponsorName },
        { name: "Duration", width: '300px', selector: (row:APISponsorshipListResponse) => (
            `${FormattedDate(row.durationFrom)} - ${FormattedDate(row.durationTo)}`
        )},
        { name: "Fund Allocation", selector: (row:APISponsorshipListResponse) => formatCurrency(row.fundAllocation) },
        { name: <div className="flex justify-center w-full">Requirements</div>, cell: (row:APISponsorshipListResponse) => (
            <div className="flex justify-center w-full">
                <Button onClick={() => ShowRequirements(row.sponsorshipRequirements) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </div>
        )},
        { name: <div className="flex justify-center w-full">Schools</div>, cell: (row:APISponsorshipListResponse) => (
            <div className="flex justify-center w-full">
                <Button onClick={() => ShowSchools(row.sponsorshipSchool) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </div>
        )},
        { name: <div className="flex justify-center w-full">Rank Students</div>,cell: (row:APISponsorshipListResponse) => (
            <div className="flex justify-center w-full">
                <Button onClick={() => rankStudents(row.id)} variants="text" startIcon={<BsClipboard2DataFill className='text-success hover:text-primary' title="Update Criterion" size={20}/>}/>
            </div>
        )},
    ], []);

    const ShowRequirements = (reqs: SponsorshipRequirements[]) => {
        setOpenReqModal(true);
        setSelectedReqs(reqs);
    };

    const ShowSchools = (schools: SponsorshipSchoolProps[]) => {
        setOpenSchoolsModal(true);
        setSelectedSchools(schools);
    }


    const pathname = usePathname();
    const rankStudents = (sponsorId: string) => {
        showLoader();
        router.push(`${pathname}/${sponsorId}`);
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
          
            <StyledModal isFullscreen={false} title="Requirements List" className="min-w-125" isOpen={openReqModal} onClose={() => setOpenReqModal(false)}>
                <ul className="flex flex-col gap-4">
                    {selectedReqs.map((item: any, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{index + 1}. {item.fileName}</span>
                        </li>
                    ))}
                </ul>
            </StyledModal>


            <StyledModal isFullscreen={false} title="Schools List" className="min-w-125" isOpen={openSchoolsModal} onClose={() => setOpenSchoolsModal(false)}>
                <ul className="flex flex-col gap-4">
                    {selectedSchools.map((item: any, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{index + 1}. {item.schoolName}</span>
                        </li>
                    ))}
                </ul>
            </StyledModal>

        </Fragment>
    )
};

export default RankingStudentListing;