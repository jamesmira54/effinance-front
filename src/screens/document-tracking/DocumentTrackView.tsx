"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { DocumentTrackingAPIService } from "@/api";
import { DocumentTrack, TrackCurrentUser, TrackHistoryEntry } from "@/types/document-tracking.types";
import { TRACK_STATUS } from "@/utils/constant";
import DocumentTrackForm from "./DocumentTrackForm";
import DocumentTrackActions from "./DocumentTrackActions";
import {
    canViewTrack,
    formatDateTime,
    processTypeLabel,
    purposeLabel,
    statusLabel,
    statusVariant,
} from "./trackDisplay";

interface DocumentTrackViewProps {
    trackId: string;
    currentUser: TrackCurrentUser;
    awardedSponsorshipIds: string[];
    sponsorshipOptions: SelectOption[];
}

const trackingAPI = new DocumentTrackingAPIService();

const HISTORY_LABEL: Record<TrackHistoryEntry["action"], string> = {
    CREATED: "Created",
    SUBMITTED: "Submitted",
    ACCEPTED: "In-Processed",
    FORWARDED: "Forwarded",
    RETURNED: "Returned",
    DONE: "Done",
};

const Detail: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <dt className="text-sm text-body dark:text-bodydark">{label}</dt>
        <dd className="whitespace-pre-wrap font-medium text-black dark:text-white">{value}</dd>
    </div>
);

const DocumentTrackView: React.FC<DocumentTrackViewProps> = ({ trackId, currentUser, awardedSponsorshipIds, sponsorshipOptions }) => {
    const [track, setTrack] = useState<DocumentTrack | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        trackingAPI.getTrack(trackId)
            .then((found) => setTrack(found && canViewTrack(found, currentUser, awardedSponsorshipIds) ? found : null))
            .catch(() => setErrorMessage("Unable to load the track."))
            .finally(() => setIsLoading(false));
    }, [trackId, currentUser, awardedSponsorshipIds]);

    const card = "rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 print:border-0 print:shadow-none";

    if (isLoading) return <Throbber />;
    if (errorMessage) return <Alert variant="error" title="Error" message={errorMessage} />;
    if (!track) {
        return (
            <div className={card}>
                <p className="mb-4">Track not found.</p>
                <Link className="text-primary hover:underline" href="/document-tracking">Back to Document Tracking</Link>
            </div>
        );
    }

    const isDraft = track.status === TRACK_STATUS.DRAFT;
    const canEditDraft = isDraft && track.createdBy.userId === currentUser.userId;

    const handleSaved = (updated: DocumentTrack) => {
        setTrack(updated);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className={card}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-black dark:text-white">{track.trackNumber}</h3>
                        <Badge variants={statusVariant(track.status)}>{statusLabel(track.status)}</Badge>
                    </div>
                    <div className="flex gap-3 print:hidden">
                        {canEditDraft && !isEditing && (
                            <Button variants="outlined" className="py-2 lg:px-5 xl:px-5" onClick={() => setIsEditing(true)}>Edit Draft</Button>
                        )}
                        {!isDraft && (
                            <Button className="bg-primary py-2 lg:px-5 xl:px-5" onClick={() => window.print()}>Print Track</Button>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <DocumentTrackForm
                        currentUser={currentUser}
                        sponsorshipOptions={sponsorshipOptions}
                        initialTrack={track}
                        onSaved={handleSaved}
                    />
                ) : (
                    <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Detail label="Title of the Document" value={track.title} />
                        <Detail label="Sponsorship" value={track.sponsorshipName} />
                        <Detail label="Type of Process" value={processTypeLabel(track.processType)} />
                        <Detail label="Purpose" value={purposeLabel(track.purpose)} />
                        <Detail label={isDraft ? "Created By" : "Current Office"} value={isDraft ? track.createdBy.name : track.currentHolder} />
                        <Detail label="Date Submitted" value={track.submittedAt ? formatDateTime(track.submittedAt) : "Not submitted"} />
                        <div className="md:col-span-2">
                            <Detail label="Particulars" value={track.particulars} />
                        </div>
                    </dl>
                )}
            </div>

            {!isEditing && (
                <div className={`${card} print:hidden empty:hidden`}>
                    <DocumentTrackActions track={track} currentUser={currentUser} onUpdated={setTrack} />
                </div>
            )}

            <div className={card}>
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Tracking History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-left text-sm">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                <th className="px-3 py-2">Date and Time</th>
                                <th className="px-3 py-2">Action</th>
                                <th className="px-3 py-2">From</th>
                                <th className="px-3 py-2">To</th>
                                <th className="px-3 py-2">By</th>
                                <th className="px-3 py-2">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {track.history.map((item, index) => (
                                <tr key={`${item.at}-${index}`} className="border-b border-stroke dark:border-strokedark">
                                    <td className="px-3 py-2">{formatDateTime(item.at)}</td>
                                    <td className="px-3 py-2">{HISTORY_LABEL[item.action]}</td>
                                    <td className="px-3 py-2">{item.fromOffice}</td>
                                    <td className="px-3 py-2">{item.toOffice ?? "-"}</td>
                                    <td className="px-3 py-2">{item.actor.name}</td>
                                    <td className="whitespace-pre-wrap px-3 py-2">{item.remarks ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DocumentTrackView;
