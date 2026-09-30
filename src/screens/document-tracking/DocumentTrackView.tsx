"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Modal from "@/components/Modal";
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { DocumentTrack, TrackCurrentUser } from "@/types/document-tracking.types";
import { TRACK_STATUS } from "@/utils/constant";
import DocumentTrackForm, { TrackFormOptionsProps } from "./DocumentTrackForm";
import DocumentTrackActions from "./DocumentTrackActions";
import {
    formatDateTime,
    HISTORY_LABEL,
    historyFrom,
    readBlobError,
    statusLabel,
    statusVariant,
    toTrackError,
} from "./trackDisplay";

interface DocumentTrackViewProps {
    trackId: string;
    currentUser: TrackCurrentUser;
    options: TrackFormOptionsProps;
}

const trackingAPI = new DocumentTrackingAPIService();

const Detail: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <dt className="text-sm text-body dark:text-bodydark">{label}</dt>
        <dd className="whitespace-pre-wrap font-medium text-black dark:text-white">{value}</dd>
    </div>
);

const card = "rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5";

const DocumentTrackView: React.FC<DocumentTrackViewProps> = ({ trackId, currentUser, options }) => {
    const router = useRouter();
    const [track, setTrack] = useState<DocumentTrack | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [discardOpen, setDiscardOpen] = useState<boolean>(false);
    const [isBusy, setIsBusy] = useState<boolean>(false);

    const handleError = useCallback((err: unknown) => {
        const error = toTrackError(err);
        if (error.signedOut) router.push("/login");
        return error;
    }, [router]);

    const load = useCallback(async () => {
        try {
            setTrack(await trackingAPI.getTrack(trackId));
            setNotFound(false);
        } catch (err) {
            const error = handleError(err);
            if (error.message === "Something went wrong.") {
                setErrorMessage(error.message);
            } else {
                setNotFound(true);
            }
        } finally {
            setIsLoading(false);
        }
    }, [trackId, handleError]);

    useEffect(() => {
        load();
    }, [load]);

    if (isLoading) return <Throbber />;
    if (notFound || (!track && !errorMessage)) {
        return (
            <div className={card}>
                <p className="mb-4">Track not found.</p>
                <Link className="text-primary hover:underline" href="/document-tracking">Back to Document Tracking</Link>
            </div>
        );
    }
    if (!track) return <Alert variant="error" title="Error" message={errorMessage} />;

    const canEdit = track.allowedActions.includes("EDIT");
    const isDraft = track.status === TRACK_STATUS.DRAFT;

    const updateTrack = (updated: DocumentTrack) => {
        setErrorMessage("");
        setTrack(updated);
        setIsEditing(false);
    };

    const discard = async () => {
        setDiscardOpen(false);
        setIsBusy(true);
        try {
            await trackingAPI.discard(track.id);
            router.push("/document-tracking");
        } catch (err) {
            const error = handleError(err);
            setErrorMessage(error.message);
            if (error.reload) load();
            setIsBusy(false);
        }
    };

    const downloadPdf = async () => {
        setIsBusy(true);
        setErrorMessage("");
        try {
            const blob = await trackingAPI.pdf(track.id);
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${track.trackNumber}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setErrorMessage(handleError(await readBlobError(err)).message);
        } finally {
            setIsBusy(false);
        }
    };

    const buttonSize = "py-2 lg:px-5 xl:px-5";

    return (
        <div className="flex flex-col gap-6">
            <div className={card}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-black dark:text-white">{track.trackNumber}</h3>
                        <Badge variants={statusVariant(track.status)}>{statusLabel(track.status)}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {isBusy && <Throbber />}
                        {canEdit && !isEditing && (
                            <Button variants="outlined" className={buttonSize} onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                        {isDraft && canEdit && !isEditing && (
                            <Button variants="outlined" className={buttonSize} onClick={() => setDiscardOpen(true)}>Discard Draft</Button>
                        )}
                        {!isDraft && (
                            <Button className={`bg-primary ${buttonSize}`} onClick={downloadPdf} disabled={isBusy}>Print Track as PDF</Button>
                        )}
                    </div>
                </div>

                {errorMessage && <div className="mb-4"><Alert variant="error" title="Error" message={errorMessage} /></div>}

                <div className="mb-6 rounded border border-primary/30 bg-primary/5 px-4 py-3">
                    <span className="text-sm text-body dark:text-bodydark">Currently with</span>
                    <p className="text-lg font-semibold text-black dark:text-white">{track.currentHolder}</p>
                </div>

                {isEditing ? (
                    <DocumentTrackForm
                        currentUser={currentUser}
                        options={options}
                        initialTrack={track}
                        onSaved={updateTrack}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Detail label="Title of the Document" value={track.title} />
                        <Detail label="Sponsorship" value={track.sponsorshipName} />
                        <Detail label="Type of Process" value={track.processType} />
                        <Detail label="Purpose" value={track.purpose} />
                        <Detail label="Created By" value={`${track.createdBy.name} · ${formatDateTime(track.createdAt)}`} />
                        {isDraft && <Detail label="Intended Destination" value={track.intendedDestination ?? "-"} />}
                        <Detail label="Submitted At" value={formatDateTime(track.submittedAt)} />
                        <Detail label="Completed At" value={formatDateTime(track.completedAt)} />
                        <div className="md:col-span-2">
                            <Detail label="Particulars" value={track.particulars} />
                        </div>
                    </dl>
                )}
            </div>

            {!isEditing && track.allowedActions.some((action) => action !== "EDIT") && (
                <div className={card}>
                    <DocumentTrackActions
                        track={track}
                        currentUser={currentUser}
                        offices={options.offices}
                        onUpdated={updateTrack}
                        onReload={load}
                    />
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
                            {(track.history ?? []).map((entry) => (
                                <tr key={entry.sequence} className="border-b border-stroke dark:border-strokedark">
                                    <td className="px-3 py-2">{formatDateTime(entry.at)}</td>
                                    <td className="px-3 py-2">{HISTORY_LABEL[entry.action]}</td>
                                    <td className="px-3 py-2">{historyFrom(entry)}</td>
                                    <td className="px-3 py-2">{entry.toOffice ?? "-"}</td>
                                    <td className="px-3 py-2">{entry.actor.office ? `${entry.actor.name} (${entry.actor.office})` : entry.actor.name}</td>
                                    <td className="whitespace-pre-wrap px-3 py-2">{entry.remarks ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={discardOpen} onClose={() => setDiscardOpen(false)} title="Discard draft?" className="max-w-lg">
                <p className="mb-6">This draft will be deleted. This can&apos;t be undone.</p>
                <div className="flex justify-end gap-3">
                    <Button type="button" variants="outlined" onClick={() => setDiscardOpen(false)}>Cancel</Button>
                    <Button type="button" className="bg-danger" onClick={discard}>Discard</Button>
                </div>
            </Modal>
        </div>
    );
};

export default DocumentTrackView;
