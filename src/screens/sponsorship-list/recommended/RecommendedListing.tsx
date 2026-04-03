"use client";

import { APISponsorshipListResponse, SponsorshipRequirements, SponsorshipSchoolProps } from "@/types/sponsorship.types";
import { Fragment, use, useEffect, useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FormattedDate, formatCurrency } from "@/utils/helpers";
import Button from "@/components/Button";
import { FaRegEye } from "react-icons/fa6";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { BsArrowDownLeftSquareFill } from "react-icons/bs";
import Alert from "@/components/Alert/Alert";
import RecommendedView from "./RecommendedView";



const StyledModal = styled(Modal)`
    overflow: auto;
    width: 500px;
`;


interface serverDataProps {
    sponsorships: APISponsorshipListResponse[];
    studentId: string | null;
}

const RecommendedListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {
    const SponsorshipStudentAPI = new SponsorshipStudentAPIService();
    const studentId = serverData.studentId;

    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [selectedReqs, setSelectedReqs] = useState<SponsorshipRequirements[]>([]);
    const [remarks, setRemarks] = useState<string>("");
    const [openRemarksModal, setOpenRemarksModal] = useState<boolean>(false);
    const [data, setData] = useState<APISponsorshipListResponse[]>(serverData.sponsorships || []);
    const [openSchoolsModal, setOpenSchoolsModal] = useState<boolean>(false);
    const [selectedSchools, setSelectedSchools] = useState<SponsorshipSchoolProps[]>([]);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const [pendingAppliedSponsorship, setPendingAppliedSponsorship] = useState<{ studentId: string | null, sponsorshipId: string } | null>(null);
    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<APISponsorshipListResponse>({} as APISponsorshipListResponse);
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);

    const columns: TableColumn<APISponsorshipListResponse>[] = useMemo(() => [
        { name: "Financial Assistance Name", selector: (row:APISponsorshipListResponse) => row.name, sortable: true,
            cell: (row: APISponsorshipListResponse) => (
                <Button variants="text" onClick={() => { setSelectedItem(row); setOpenFormModal(true); }}><span className="text-primary">{row.name}</span></Button>
            )
        },
        { name: "Sponsor", selector: (row:APISponsorshipListResponse) => row.sponsorName },
        { name: "Duration", width: '300px', selector: (row:APISponsorshipListResponse) => (
            `${FormattedDate(row.durationFrom)} - ${FormattedDate(row.durationTo)}`
        )},
        { name: "Fund Allocation", selector: (row:APISponsorshipListResponse) => formatCurrency(row.fundAllocation) },
        { name: "Status", selector: (row:APISponsorshipListResponse) => row.status.toUpperCase() },
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
        { name: <div className="flex justify-center w-full">Action</div>, cell: (row:APISponsorshipListResponse) => (
            <div className="flex justify-center w-full">
               <div className="flex items-center space-x-4">
                    <Button onClick={() => onApply(studentId, row.id) } variants="text" color="success" startIcon={<BsArrowDownLeftSquareFill className="text-success" size={18}/>}>Apply</Button>
                </div>
            </div>
        )},
    ], []);


    useEffect(() => {
        if(showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const ShowRequirements = (reqs: SponsorshipRequirements[]) => {
        setOpenReqModal(true);
        setSelectedReqs(reqs);
    };

    const ShowSchools = (schools: SponsorshipSchoolProps[]) => {
        setOpenSchoolsModal(true);
        setSelectedSchools(schools);
    }

    const getRemarks = async(sponsorshipId: string) => {
        const remarksData = await SponsorshipStudentAPI.getSpecificSponsorship(sponsorshipId);
        if(remarksData) {
            setRemarks(remarksData.sponsorshipRemarks || "No remarks available.");
            setOpenRemarksModal(true);
        }
    }

    const onApply = async (studentId: string | null, sponsorshipId: string) => {
        setShowAlert(false);
        setError(false);
        setErrorMessage("");
        setOpenActionModal(true);
        setPendingAppliedSponsorship({ studentId: studentId, sponsorshipId: sponsorshipId });
    }

    const cancelApply = () => {
        setOpenActionModal(false);
    }

    const refetchRecommendations = async () => {
        if(studentId) {
            const updatedSponsorships = await SponsorshipStudentAPI.getAvailableSponsorships(studentId);
            setData(updatedSponsorships || []);
        }
    }

    const onApplyConfirmation = () => {
        if (pendingAppliedSponsorship) {
            const { studentId, sponsorshipId } = pendingAppliedSponsorship;
            if (studentId && sponsorshipId) {
                SponsorshipStudentAPI.applyForSponsorship(studentId, sponsorshipId)
                    .then(async () => {
                        await refetchRecommendations();
                        setTimeout(() => {
                            setShowAlert(true);
                            setOpenActionModal(false);
                        }, 1000);
                        setError(false);
                    })
                    .catch((error) => {
                        if(error.response && error.response.data) {
                            setShowAlert(true);
                            setErrorMessage(error.response.data.errorDetails?.errors?.[0].msg || "Failed to apply for sponsorship. Please try again.");
                            setError(true);
                            setTimeout(() => {
                                setOpenActionModal(false);
                            }, 2000);
                        }
                    });
            }
        }
    }
    

    return (
        <Fragment>
            <div className="max-w-full overflow-x-auto">
                {showAlert && (
                    <div className="mt-5">
                        <Alert 
                            variant={isError ? 'error' : 'success'}
                            title={isError ? 'Error' : "Success!"}
                            message={isError ? errorMessage : "Sponsorship Applied Successfully!"}
                            showLink={false} 
                        />
                    </div>
                )}

                <DataTable 
                    columns={columns} 
                    data={data} 
                    pagination 
                    highlightOnHover 
                    striped
                />
            </div>

            <StyledModal isFullscreen={true} title="Sponsorship Details" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <RecommendedView 
                    details={selectedItem}
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


            <Modal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => setOpenActionModal(false)}>
                <div className="text-center">
                    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                       Confirmation of Application.
                    </p>

                    <div className="flex items-center justify-center w-full gap-6 mt-8">
                        <Button className="bg-primary" onClick={() => cancelApply()}>
                            Cancel
                        </Button>
                        <Button className="bg-success" onClick={() => onApplyConfirmation()}>Proceed</Button>
                    </div>
                    {errorMessage && <p className="text-danger mt-2">Error: {errorMessage}</p>}
                </div>
            </Modal>

        </Fragment>
    );
};

export default RecommendedListing;