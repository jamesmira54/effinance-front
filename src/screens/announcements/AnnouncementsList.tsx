"use client";

import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import { Fragment, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { FaRegEye } from "react-icons/fa6";
import Badge from "@/components/Badge/Badge";
import { AnnouncementDetailsProps, AnnouncementsListProps, APILoginResponse, APIModuleProps } from "@/types";
import { TableColumn } from "react-data-table-component";
import AnnouncementsView from "./AnnouncementsView";
import { AnnouncementsAPIService } from "@/api";
import { useLoader } from "@/context/LoaderContext";
import { ProvinceProps, RegionProps } from "../setup-manager/school/School.types";
import AnnouncementsForm from "./AnnouncementsForm";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";


const StyledModal = styled(Modal)`
    overflow: auto;
    width: 700px;
`;


interface serverDataProps {
    userSession: APILoginResponse;
    announcements: AnnouncementsListProps[];
    provinces: ProvinceProps[], 
    allSponsorships: APISponsorshipListResponse[],
}


const AnnouncementsList: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {

    console.log("serverData", serverData);

    const isAdmin = serverData.userSession.studentId === null;
    const loadServerData = {
        provinces: serverData.provinces,
        sponsorships: serverData.allSponsorships
    }
    const AnnouncementsAPI = new AnnouncementsAPIService();
    const { showLoader, hideLoader } = useLoader();
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [data, setData] = useState<AnnouncementsListProps[]>(serverData.announcements || []);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false);
    const [pendingDelId, setPendingDelId] = useState<string | null>(null);

    useEffect(() => {
        setData(serverData.announcements || []);
    }, [serverData.announcements]);

    const columns: TableColumn<AnnouncementsListProps>[] = useMemo(() => [
        { name: "Title", selector: (row:AnnouncementsListProps) => row.title, sortable: true },
        { name: "Caption", selector: (row:AnnouncementsListProps) => row.caption },
        { name: "Sponsorship", selector: (row:AnnouncementsListProps) => row.sponsorshipName || "N/A" },
        { name: <div className="flex justify-center w-full">Status</div>, cell: () => ( 
            <div className="flex justify-center w-full">
                <Badge variants="warning">Unread</Badge> 
            </div>
        )},
        { name: <div className="flex justify-center w-full">View</div>, cell: (row:AnnouncementsListProps) => ( 
            <div className="flex justify-center w-full">
                <div className="flex items-center space-x-4">
                    <Button onClick={() => handleAction(row.id, row.sponsorshipName || "")} variants="text" startIcon={<FaRegEye className="text-success" size={20}/>}/>
                </div>
            </div>
        )},
        { name: <div className="flex justify-center w-full">Action</div>, cell: (row:AnnouncementsListProps) => (
            <div className="flex justify-center w-full">
                <div className="flex items-center space-x-3.5">
                    <Button onClick={() => handleEdit(row.id)} variants="text" startIcon={<CiEdit className='text-warning hover:text-primary' title="Edit" size={22}/>}/>
                    <Button onClick={() => onDeleteWaring(row.id)} variants="text" startIcon={<RiDeleteBin5Line className='text-danger hover:text-primary' title="Delete" size={20}/>}/>
                </div>
            </div>
        )},
    ], []);

    const [openViewingModal, setOpenViewingModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<AnnouncementDetailsProps>({} as AnnouncementDetailsProps);

    const fetchAnnouncementDetails = async (id: string) => {
        try {
            const response = await AnnouncementsAPI.getAnnouncementDetails(id);
            return response;
        } catch (error) {
            console.error("Failed to fetch announcement details", error);
            throw error;
        }
    }

    const handleAction = async (id: string, sponsorshipName: string) => { 
        showLoader();
        const respone = await fetchAnnouncementDetails(id);
        if(respone) {
            respone.sponsorshipName = sponsorshipName;
            setSelectedItem(respone);
            setOpenViewingModal(true);
        }
        hideLoader();
    }

    const handleAddNew = () => {
        setSelectedItem({} as AnnouncementDetailsProps);
        setOpenFormModal(true);
    }

    const reFetchData = async () => {
        showLoader();
        const res = await AnnouncementsAPI.getAnnouncements({ offset: 0, limit: 50, mine: true });
        if (res) {
            setData(res || []);
        }
        hideLoader();
    };

    const handleSuccess = (updateItem: AnnouncementDetailsProps, isNew: boolean) => {
        setSelectedItem(updateItem);
        setData(prev =>
            prev.map(item => item.id === updateItem.id ? updateItem : item)
        );

        isNew && reFetchData();

        setTimeout(() => {
            setOpenFormModal(false);
        }, 1000);
    };

    const handleEdit = (announcementId: string) => {    
        const getDetailsAndOpenForm = async () => {
            showLoader();
            const announcement = await fetchAnnouncementDetails(announcementId);
            if (announcement) {
                setSelectedItem(announcement);
                setOpenFormModal(true);
            }
            hideLoader();
        };
        getDetailsAndOpenForm();
    }

    const onDeleteWaring = async (fileId: string) => {
        setOpenActionModal(true);
        setPendingDelId(fileId);
    }

    const cancelDelete = () => {
        setOpenActionModal(false);
        setPendingDelId(null);
    };

    const onConfirmDelete = async () => {
        showLoader();
        if (pendingDelId) {
            setOpenActionModal(false);

            const response = await AnnouncementsAPI.deleteAnnouncement(pendingDelId);
            if (response) {
                setData((prevData) => prevData.filter((item) => item.id !== pendingDelId));
                setPendingDelId(null);
            }
        }
        hideLoader();
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
              {isAdmin && (
                <Button onClick={() => handleAddNew()} style={{marginTop: '30px'}} startIcon={<CiSquarePlus size={24}/>} className="bg-primary">Add New</Button>
              )}    
            </div>

            <StyledModal isFullscreen={true} title="Creating Announcement" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <AnnouncementsForm 
                    initialData={selectedItem} 
                    serverData={loadServerData}
                    onSuccess={(item: AnnouncementDetailsProps, isNew: boolean) => handleSuccess(item, isNew)}
                />
            </StyledModal>

            <StyledModal isFullscreen={true} title="Announcment"  isOpen={openViewingModal} onClose={() => setOpenViewingModal(false)}>
                <AnnouncementsView 
                    details={selectedItem}
                />
            </StyledModal>

            <Modal isTextCentered={true} title="Are you Sure?" className="max-w-100" isOpen={openActionModal} onClose={() => setOpenActionModal(false)}>
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
            </Modal>
        </Fragment>
    )
};

export default AnnouncementsList;