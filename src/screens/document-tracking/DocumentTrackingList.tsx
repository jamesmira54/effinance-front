"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { CiSquarePlus } from "react-icons/ci";
import DataTable from "@/components/DataTable";
import Tabs from "@/components/Tabs";
import Badge from "@/components/Badge";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { DocumentTrack, TrackCurrentUser } from "@/types/document-tracking.types";
import { TRACK_STATUS } from "@/utils/constant";
import {
    canViewTrack,
    formatDateTime,
    isTrackCreator,
    lastUpdated,
    processTypeLabel,
    purposeLabel,
    statusLabel,
    statusVariant,
} from "./trackDisplay";

interface DocumentTrackingListProps {
    currentUser: TrackCurrentUser;
    awardedSponsorshipIds: string[];
}

const trackingAPI = new DocumentTrackingAPIService();

const DocumentTrackingList: React.FC<DocumentTrackingListProps> = ({ currentUser, awardedSponsorshipIds }) => {
    const [tracks, setTracks] = useState<DocumentTrack[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        trackingAPI.getTracks()
            .then((all) => setTracks(all.filter((track) => canViewTrack(track, currentUser, awardedSponsorshipIds))))
            .catch(() => setErrorMessage("Unable to load document tracks."))
            .finally(() => setIsLoading(false));
    }, [currentUser, awardedSponsorshipIds]);

    const columns: TableColumn<DocumentTrack>[] = useMemo(() => [
        {
            name: "Track No.",
            cell: (row) => <Link className="text-primary hover:underline" href={`/document-tracking/${row.id}`}>{row.trackNumber}</Link>,
            sortable: true,
            sortFunction: (a, b) => a.trackNumber.localeCompare(b.trackNumber),
        },
        { name: "Title", selector: (row) => row.title, sortable: true, wrap: true },
        { name: "Sponsorship", selector: (row) => row.sponsorshipName, sortable: true, wrap: true },
        { name: "Type of Process", selector: (row) => processTypeLabel(row.processType), wrap: true },
        { name: "Purpose", selector: (row) => purposeLabel(row.purpose) },
        { name: "Current Office", selector: (row) => row.currentHolder, sortable: true, wrap: true },
        { name: "Status", cell: (row) => <Badge variants={statusVariant(row.status)}>{statusLabel(row.status)}</Badge> },
        { name: "Last Updated", selector: (row) => formatDateTime(lastUpdated(row)), wrap: true },
    ], []);

    const tabs = Object.values(TRACK_STATUS).map((status) => {
        const rows = tracks.filter((track) => track.status === status);
        return {
            label: `${statusLabel(status)} (${rows.length})`,
            content: (
                <DataTable
                    columns={columns}
                    data={rows}
                    pagination
                    noDataComponent={<p className="py-6">No {statusLabel(status).toLowerCase()} tracks.</p>}
                />
            ),
        };
    });

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            {isTrackCreator(currentUser.userType) && (
                <div className="mb-4 flex justify-end">
                    <Link
                        href="/document-tracking/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
                    >
                        <CiSquarePlus size={22} /> Create Track
                    </Link>
                </div>
            )}

            {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}

            {isLoading ? <Throbber /> : <Tabs tabs={tabs} />}
        </div>
    );
};

export default DocumentTrackingList;
