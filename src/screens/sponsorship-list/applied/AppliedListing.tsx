"use client";

import { AppliedSponsorshipDetailResponse, SponsorshipRequirements } from "@/types/sponsorship.types";
import { Fragment, useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FormattedDate } from "@/utils/helpers";
import Button from "@/components/Button";
import Badge from "@/components/Badge/Badge";
import { APPLICATION_STATUS } from "@/utils/constant";
import { FaRegEye } from "react-icons/fa6";
import SponsorshipStudentAPIService from "@/api/sponsorship-student-api";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import AppliedViewing from "./AppliedViewing";


const StyledModal = styled(Modal)`
    overflow: auto;
    width: 500px;
`;


interface serverDataProps {
    sponsorships: AppliedSponsorshipDetailResponse[];
}

const AppliedListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {
    const SponsorshipStudentAPI = new SponsorshipStudentAPIService();

    const [openReqModal, setOpenReqModal] = useState<boolean>(false);
    const [selectedReqs, setSelectedReqs] = useState<SponsorshipRequirements[]>([]);
    const [remarks, setRemarks] = useState<string>("");
    const [openRemarksModal, setOpenRemarksModal] = useState<boolean>(false);
    const [data, setData] = useState<AppliedSponsorshipDetailResponse[]>(serverData.sponsorships || []);
    const [openViewingModal, setOpenViewingModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<AppliedSponsorshipDetailResponse>({} as AppliedSponsorshipDetailResponse);

    const columns: TableColumn<AppliedSponsorshipDetailResponse>[] = useMemo(() => [
        { name: "Application #", selector: (row:AppliedSponsorshipDetailResponse) => row.appId, sortable: true,
            cell: (row: AppliedSponsorshipDetailResponse) => (
                <Button variants="text" onClick={() => { setSelectedItem(row); setOpenViewingModal(true); }}><span className="text-primary">{row.appId}</span></Button>
            )
         },
        { name: "Finas Applied", selector: (row:AppliedSponsorshipDetailResponse) => row.sponsorshipName, sortable: true },
        { name: "Date of Application", selector: (row:AppliedSponsorshipDetailResponse) => FormattedDate(row.applicationDate), sortable: true },
        { name: "Req's", cell: (row:AppliedSponsorshipDetailResponse) => (
            <div className="flex justify-center">
                <Button onClick={() => ShowRequirements(row.sponsorshipRequirement) } variants="text" startIcon={<FaRegEye size={20}/>}/>
            </div>
        )},
        { name: <div className="flex justify-center w-full">Status</div>, cell: (row:AppliedSponsorshipDetailResponse) => ( 
            <div className="flex justify-center w-full">
                <Badge variants={
                    row.sponsorshipStatus === APPLICATION_STATUS.PENDING_POOLING ? "warning" : 
                    row.sponsorshipStatus === APPLICATION_STATUS.FOLLOW_UP ? "warning" : 
                    row.sponsorshipStatus === APPLICATION_STATUS.COMPLETE ? "success" : 
                    row.sponsorshipStatus === APPLICATION_STATUS.REJECTED ? "error" : 
                    "default"}>
                        {row.sponsorshipStatus
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

    const ShowRequirements = (reqs: SponsorshipRequirements[]) => {
        setOpenReqModal(true);
        setSelectedReqs(reqs);
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

            <StyledModal isFullscreen={true} title="Sponsorship Details" className="max-w-180" isOpen={openViewingModal} onClose={() => setOpenViewingModal(false)}>
                <AppliedViewing 
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
    );
};

export default AppliedListing;