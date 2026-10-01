"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TableColumn } from "react-data-table-component";
import { CiEdit, CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import DataTable from "@/components/DataTable";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Modal from "@/components/Modal";
import { DocumentTrackingAPIService } from "@/api";
import { useLoader } from "@/context/LoaderContext";
import { SetupItem, SetupKind } from "@/types/document-tracking.types";
import { formatDateTime, toTrackError } from "@/screens/document-tracking/trackDisplay";
import OfficeTrackSetupForm from "./OfficeTrackSetupForm";

interface OfficeTrackSetupListingProps {
    kind: SetupKind;
    title: string;
    canManage: boolean;
}

const trackingAPI = new DocumentTrackingAPIService();

const OfficeTrackSetupListing: React.FC<OfficeTrackSetupListingProps> = ({ kind, title, canManage }) => {
    const router = useRouter();
    const { showLoader, hideLoader } = useLoader();
    const [rows, setRows] = useState<SetupItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [searchInput, setSearchInput] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [editing, setEditing] = useState<SetupItem | null>(null);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [pendingDelete, setPendingDelete] = useState<SetupItem | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const showError = useCallback((err: unknown) => {
        const error = toTrackError(err);
        if (error.signedOut) {
            router.push("/login");
            return;
        }
        setErrorMessage(error.message);
    }, [router]);

    const load = useCallback(async () => {
        setIsLoading(true);
        showLoader();
        try {
            const result = await trackingAPI.setupList(kind, { search, offset: (page - 1) * perPage, limit: perPage });
            setRows(result?.data ?? []);
            setTotal(result?.total ?? 0);
        } catch (err) {
            showError(err);
            setRows([]);
            setTotal(0);
        } finally {
            setIsLoading(false);
            hideLoader();
        }
    }, [kind, search, page, perPage, showError, showLoader, hideLoader]);

    useEffect(() => {
        load();
    }, [load]);

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    const openForm = useCallback((item: SetupItem | null) => {
        setErrorMessage("");
        setEditing(item);
        setFormOpen(true);
    }, []);

    const handleSaved = () => {
        setFormOpen(false);
        setEditing(null);
        load();
    };

    const toggleActive = useCallback(async (item: SetupItem) => {
        setErrorMessage("");
        setTogglingId(item.id);
        setRows((current) => current.map((row) => (row.id === item.id ? { ...row, isActive: !item.isActive } : row)));
        showLoader();
        try {
            const saved = await trackingAPI.setupUpdate(kind, item.id, { isActive: !item.isActive });
            setRows((current) => current.map((row) => (row.id === item.id ? saved : row)));
        } catch (err) {
            setRows((current) => current.map((row) => (row.id === item.id ? item : row)));
            showError(err);
        } finally {
            setTogglingId(null);
            hideLoader();
        }
    }, [kind, showError, showLoader, hideLoader]);

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        const item = pendingDelete;
        setPendingDelete(null);
        setErrorMessage("");
        showLoader();
        try {
            await trackingAPI.setupDelete(kind, item.id);
            load();
        } catch (err) {
            showError(err);
        } finally {
            hideLoader();
        }
    };

    const columns: TableColumn<SetupItem>[] = useMemo(() => [
        { name: "Name", selector: (row) => row.name, wrap: true },
        { name: "Sort Order", selector: (row) => row.sortOrder },
        { name: "Status", cell: (row) => <Badge variants={row.isActive ? "success" : "warning"}>{row.isActive ? "Active" : "Inactive"}</Badge> },
        { name: "Updated", selector: (row) => formatDateTime(row.updatedAt), wrap: true },
        ...(canManage ? [{
            name: "Actions",
            cell: (row: SetupItem) => (
                <div className="flex items-center gap-4">
                    <Button variants="text" aria-label={`Edit ${row.name}`} onClick={() => openForm(row)} startIcon={<CiEdit size={22} />} />
                    <Button variants="text" onClick={() => toggleActive(row)} disabled={togglingId === row.id}>
                        {row.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variants="text" aria-label={`Delete ${row.name}`} onClick={() => setPendingDelete(row)} startIcon={<RiDeleteBin5Line size={20} />} />
                </div>
            ),
        }] : []),
    ], [canManage, togglingId, toggleActive, openForm]);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <form onSubmit={handleSearch} className="flex gap-2" role="search">
                    <label htmlFor="setup-search" className="sr-only">Search {title}</label>
                    <input
                        id="setup-search"
                        type="search"
                        placeholder={`Search ${title.toLowerCase()}`}
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        className="rounded border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                    />
                    <button type="submit" className="rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90">Search</button>
                </form>
                {canManage && (
                    <Button className="bg-primary py-3" onClick={() => openForm(null)} startIcon={<CiSquarePlus size={22} />}>
                        Add {title}
                    </Button>
                )}
            </div>

            {errorMessage && <div className="mb-4"><Alert variant="error" title="Error" message={errorMessage} /></div>}

            <DataTable
                key={`${search}-${perPage}`}
                columns={columns}
                data={rows}
                progressPending={isLoading}
                progressComponent={<div className="py-6" />}
                noDataComponent={<p className="py-6">No values yet.</p>}
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

            <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={editing ? `Edit ${title}` : `Add ${title}`} className="max-w-lg">
                {formOpen && (
                    <OfficeTrackSetupForm
                        kind={kind}
                        item={editing ?? undefined}
                        onSaved={handleSaved}
                        onCancel={() => setFormOpen(false)}
                    />
                )}
            </Modal>

            <Modal isOpen={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title={`Delete ${title}?`} className="max-w-lg">
                <p className="mb-2">Delete <strong>{pendingDelete?.name}</strong>?</p>
                <p className="mb-6 text-sm">Deactivating hides it from form dropdowns but keeps it on existing tracks. Consider that instead.</p>
                <div className="flex justify-end gap-3">
                    <Button type="button" variants="outlined" onClick={() => setPendingDelete(null)}>Cancel</Button>
                    <Button type="button" className="bg-danger" onClick={confirmDelete}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
};

export default OfficeTrackSetupListing;
