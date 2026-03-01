"use client";

import DataTable from "react-data-table-component";
import "./../../../styles/styles.css";
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import SponsorshipForm from "./SponsorshipForm";
import { CiEdit } from "react-icons/ci";
import { APIAcademicYearProps, APIFileTypesProps, APIUserProfileResponse } from "@/types";
import { SchoolListProps } from "@/types/shools.types";
import { APISponsorshipListResponse, SponsorshipRequirements, SponsorshipSchoolProps } from "@/types/sponsorship.types";
import { formatCurrency, FormattedDate } from "@/utils/helpers";
import { FaRegEye } from "react-icons/fa6";
import { SponsorshipAPIService } from "@/api";
import { useRouter } from "next/navigation";
import { BsClipboard2DataFill } from "react-icons/bs";



const StyledModal = styled(Modal)`
    overflow: auto;
`;

const ActionModal = styled(Modal)`

`;

interface serverDataProps {
    coordinators: APIUserProfileResponse[];
    schools: SchoolListProps[];
    requirements: APIFileTypesProps[];
    academicYears: APIAcademicYearProps[];
    sponsorships: APISponsorshipListResponse[]
}

const SponsorshipListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {

    const sponsorshipAPI = new SponsorshipAPIService();
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [openSchoolsModal, setOpenSchoolsModal] = useState<boolean>(false);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const [data, setData] = useState<APISponsorshipListResponse[]>(serverData.sponsorships || []);
    const [selectedReqs, setSelectedReqs] = useState<SponsorshipRequirements[]>([]);
    const [selectedSchools, setSelectedSchools] = useState<SponsorshipSchoolProps[]>([]);
    const [selectedItem, setSelectedItem] = useState<APISponsorshipListResponse>({} as APISponsorshipListResponse);
    const [pendingDelId, setPendingDelId] = useState<string | null>(null);
    const router = useRouter();


    const { coordinators, schools, requirements, academicYears } = serverData || {};


    useEffect(() => {
        setData(serverData.sponsorships || []);
    }, [serverData.sponsorships]);

    const selectOptionsData = useMemo(() => ({
        coordinators: coordinators.map(({ firstName, lastName, userId }) => ({
            label: `${firstName} ${lastName}`,
            value: userId,
        })),
        schools: schools.map(({ name, id }) => ({
            label: name,
            value: id,
        })),
        requirements: requirements.map(({ name, id }) => ({
            label: name,
            value: id,
        })),
        academicYears: academicYears.map(({ academicYearStart, academicYearEnd, id }) => ({
            label: `${academicYearStart} - ${academicYearEnd}`,
            value: id,
        })),
    }), [coordinators, schools, requirements, academicYears]);



    const columns = [
        { name: "Financial Assistance Name", selector: (row:APISponsorshipListResponse) => row.name, sortable: true },
        { name: "Sponsor", selector: (row:APISponsorshipListResponse) => row.sponsorName },
        { name: "Duration", width: '300px', selector: (row:APISponsorshipListResponse) => (
            `${FormattedDate(row.durationFrom)} - ${FormattedDate(row.durationTo)}`
        )},
        { name: "Fund Allocation", selector: (row:APISponsorshipListResponse) => formatCurrency(row.fundAllocation) },
        { name: "Status", selector: (row:APISponsorshipListResponse) => row.status.toUpperCase() },
        { name: "Req's", center: true, cell: (row:APISponsorshipListResponse) => (
            <>
                <Button onClick={() => ShowRequirements(row.sponsorshipRequirements) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </>
        )},
        { name: "Schools", center: true, cell: (row:APISponsorshipListResponse) => (
            <>
                <Button onClick={() => ShowSchools(row.sponsorshipSchool) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </>
        )},
         { name: "Criterion", center: true, cell: (row:APISponsorshipListResponse) => (
            <>
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => changeCritation(row.id)} variants="text" startIcon={<BsClipboard2DataFill title="Update Criterion" size={20}/>}/>
                </div>
            </>
        )},
        { name: "Action", cell: (row:APISponsorshipListResponse) => (
            <>
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => handleEdit(row)} variants="text" startIcon={<CiEdit title="Edit" size={22}/>}/>
                    <Button onClick={() => onDeleteWaring(row.id)} variants="text" startIcon={<RiDeleteBin5Line title="Delete" size={20}/>}/>
                </div>
            </>
        )},
    ];

    const ShowRequirements = (reqs: SponsorshipRequirements[]) => {
        setOpenReqModal(true);
        setSelectedReqs(reqs);
    };

    const ShowSchools = (schools: SponsorshipSchoolProps[]) => {
        setOpenSchoolsModal(true);
        setSelectedSchools(schools);
    }

    const handleAddNew = () => {
        setSelectedItem({} as APISponsorshipListResponse);
        setOpenFormModal(true);
    }


    const handleEdit = (item: APISponsorshipListResponse) => {    
        setSelectedItem(item);
        setOpenFormModal(true);
    }

    const onDeleteWaring = async (fileId: string) => {
        setOpenActionModal(true);
        setPendingDelId(fileId);
    }

    const changeCritation = (sponsorId: string) => {
        router.push(`/setup-manager/sponsorships/update-criterion/${sponsorId}`);
    }


    const onConfirmDelete = async () => {
        if (pendingDelId) {
            
            setOpenActionModal(false);

            const response = await sponsorshipAPI.deleteSponsorship(pendingDelId);
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
    

    const handleSuccess = (updateItem: APISponsorshipListResponse) => {
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
              <Button onClick={() => handleAddNew()} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
            </div>
            <StyledModal isFullscreen={true} title="Sponsorship Form" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <SponsorshipForm 
                    initialData={selectedItem} 
                    selectOptionsData={selectOptionsData}
                    onSuccess={(item: APISponsorshipListResponse) => handleSuccess(item)}
                />
            </StyledModal>

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

            <ActionModal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => setOpenActionModal(false)}>
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

export default SponsorshipListing;