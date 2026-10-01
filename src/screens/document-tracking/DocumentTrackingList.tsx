"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TableColumn } from "react-data-table-component";
import { CiSquarePlus } from "react-icons/ci";
import DataTable from "@/components/DataTable";
import Badge from "@/components/Badge";
import Alert from "@/components/Alert";
import { DocumentTrackingAPIService } from "@/api";
import { useLoader } from "@/context/LoaderContext";
import { DocumentTrack, TrackCurrentUser, TrackStatus } from "@/types/document-tracking.types";
import { TRACK_STATUS } from "@/utils/constant";
import { formatDateTime, statusLabel, statusVariant, toTrackError } from "./trackDisplay";

interface DocumentTrackingListProps {
    currentUser: TrackCurrentUser;
}

type TabKey = "ALL" | "INBOX" | TrackStatus;

const trackingAPI = new DocumentTrackingAPIService();

const DocumentTrackingList: React.FC<DocumentTrackingListProps> = ({ currentUser }) => {
    const router = useRouter();
    const { showLoader, hideLoader } = useLoader();
    const [tab, setTab] = useState<TabKey>("ALL");
    const [searchInput, setSearchInput] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [rows, setRows] = useState<DocumentTrack[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const tabs: { key: TabKey; label: string }[] = [
        { key: "ALL", label: "All" },
        ...Object.values(TRACK_STATUS).map((status) => ({ key: status as TabKey, label: statusLabel(status) })),
        ...(currentUser.officeId ? [{ key: "INBOX" as TabKey, label: "Pending on my office" }] : []),
    ];

    const load = useCallback(async () => {
        setIsLoading(true);
        showLoader();
        setErrorMessage("");
        try {
            const result = await trackingAPI.list({
                offset: (page - 1) * perPage,
                limit: perPage,
                status: tab === "ALL" || tab === "INBOX" ? undefined : tab,
                inbox: tab === "INBOX",
                search,
            });
            setRows(result?.data ?? []);
            setTotal(result?.total ?? 0);
        } catch (err) {
            const error = toTrackError(err);
            if (error.signedOut) {
                router.push("/login");
                return;
            }
            setErrorMessage(error.message);
            setRows([]);
            setTotal(0);
        } finally {
            setIsLoading(false);
            hideLoader();
        }
    }, [page, perPage, tab, search, router, showLoader, hideLoader]);

    useEffect(() => {
        load();
    }, [load]);

    const selectTab = (key: TabKey) => {
        setTab(key);
        setPage(1);
    };

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    const columns: TableColumn<DocumentTrack>[] = useMemo(() => [
        {
            name: "Track No.",
            cell: (row) => <Link className="text-primary hover:underline" href={`/document-tracking/${row.id}`}>{row.trackNumber}</Link>,
            
        },
        { name: "Title", selector: (row) => row.title, wrap: true },
        { name: "Particulars", selector: (row) => row.particulars, wrap: true },
        { name: "Process Type", selector: (row) => row.processType, wrap: true },
        { name: "Purpose", selector: (row) => row.purpose, wrap: true },
        { name: "Sponsorship", selector: (row) => row.sponsorshipName, wrap: true },
        { name: "Status", cell: (row) => <Badge variants={statusVariant(row.status)}>{statusLabel(row.status)}</Badge> },
        { name: "Current Office", selector: (row) => row.currentHolder, wrap: true },
        { name: "Created By", selector: (row) => row.createdBy?.name ?? "", wrap: true },
        { name: "Created At", selector: (row) => formatDateTime(row.createdAt), wrap: true },
        { name: "Submitted At", selector: (row) => formatDateTime(row.submittedAt), wrap: true },
    ], []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <form onSubmit={handleSearch} className="flex gap-2" role="search">
                    <label htmlFor="track-search" className="sr-only">Search track number or title</label>
                    <input
                        id="track-search"
                        type="search"
                        placeholder="Search track no. or title"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        className="rounded border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                    />
                    <button type="submit" className="rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90">Search</button>
                </form>
                {currentUser.canCreate && (
                    <Link
                        href="/document-tracking/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
                    >
                        <CiSquarePlus size={22} /> Create Track
                    </Link>
                )}
            </div>

            <div className="mb-4 flex flex-wrap border-b" role="tablist">
                {tabs.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        role="tab"
                        aria-selected={tab === item.key}
                        onClick={() => selectTab(item.key)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            tab === item.key ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}

            <DataTable
                key={`${tab}-${search}-${perPage}`}
                columns={columns}
                data={rows}
                progressPending={isLoading}
                progressComponent={<div className="py-6" />}
                noDataComponent={<p className="py-6">No tracks.</p>}
                pagination
                paginationServer
                paginationTotalRows={total}
                paginationDefaultPage={page}
                paginationPerPage={perPage}
                onChangePage={setPage}
                onChangeRowsPerPage={(newPerPage) => {
                    setPerPage(newPerPage);
                    setPage(1);
                }}
            />
        </div>
    );
};

export default DocumentTrackingList;
