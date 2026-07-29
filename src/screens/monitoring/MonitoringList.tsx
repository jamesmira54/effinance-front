"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FaFileExcel, FaFilePdf, FaRegEye, FaSearch } from "react-icons/fa";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import Select from "@/components/Inputs/Select/Select";
import { MonitoringAPIService } from "@/api";
import { APIAcademicYearProps } from "@/types/academics.types";
import { GranteeListResponse, GranteeRow, MonitoringFilter } from "@/types/monitoring.types";

const PAGE_SIZE = 50;
const emptyValue = "—";
const statusFilters: { value: MonitoringFilter; label: string; description: string }[] = [
  { value: "all", label: "All Grantees", description: "Every student record attached to the fund" },
  { value: "active", label: "Active", description: "Currently enrolled and receiving stipends" },
  { value: "delisted", label: "Delisted", description: "Removed from the grant" },
  { value: "graduated", label: "Graduated", description: "Completed their program under the grant" },
];

const displayValue = (value: string | number | null | undefined) => value === null || value === undefined || value === "" ? emptyValue : value;
const statusClass = (status: GranteeRow["status"]) => status === "ACTIVE" ? "bg-success/10 text-success" : status === "DELISTED" ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary";
const academicYearLabel = (year: APIAcademicYearProps) => `${year.academicYearStart}–${year.academicYearEnd} / Semester ${year.schoolTerm}`;

const downloadBlob = (content: BlobPart, type: string, filename: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const exportColumns: [string, keyof GranteeRow][] = [
  ["Seq", "seq"], ["Award Number", "awardNumber"], ["Grant", "grantName"], ["Academic Year", "academicYear"], ["Batch", "batch"],
  ["Semester", "semester"], ["Complete Name", "completeName"], ["Gender", "gender"],
  ["Year Level", "yearLevel"], ["Course", "course"], ["School", "school"], ["GWA", "gwa"], ["Status", "status"],
];

const escapeHtml = (value: unknown) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const createPdf = (rows: GranteeRow[]) => {
  const pageRows = 32;
  const pages: string[][] = [];
  const header = "SEQ | AWARD NUMBER | SCHOLARSHIP | ACADEMIC YEAR | STUDENT | GENDER | YEAR | GWA | STATUS";
  for (let index = 0; index < Math.max(rows.length, 1); index += pageRows) {
    pages.push(rows.slice(index, index + pageRows).map((row) =>
      `${row.seq} | ${row.awardNumber || "-"} | ${row.grantName} | ${row.academicYear || "-"} | ${row.completeName} | ${row.gender || "-"} | ${row.yearLevel ?? "-"} | ${row.gwa ?? "-"} | ${row.status}`
    ));
  }
  const ascii = (value: string) => value.normalize("NFKD").replace(/[^\x20-\x7E]/g, "?").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  const objects: string[] = [];
  const addObject = (value: string) => { objects.push(value); return objects.length; };
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds: number[] = [];
  const contentIds: number[] = [];
  pages.forEach((lines, pageIndex) => {
    const text = ["BT", "/F1 7 Tf", "36 560 Td", `(${ascii("Monitoring List")}) Tj`, "0 -16 Td", `(${ascii(header)}) Tj`, ...lines.flatMap((line) => ["0 -15 Td", `(${ascii(line.slice(0, 150))}) Tj`]), "0 -20 Td", `(${ascii(`Page ${pageIndex + 1} of ${pages.length}`)}) Tj`, "ET"].join("\n");
    contentIds.push(addObject(`<< /Length ${text.length} >>\nstream\n${text}\nendstream`));
    pageIds.push(addObject(""));
  });
  const pagesId = objects.length + 1;
  addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  pageIds.forEach((pageId, index) => { objects[pageId - 1] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 792 612] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`; });
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
};

const MonitoringList = ({ initialData, academicYears }: { initialData: GranteeListResponse; academicYears: APIAcademicYearProps[] }) => {
  const api = new MonitoringAPIService();
  const [data, setData] = useState(initialData.grantees || []);
  const [totalRows, setTotalRows] = useState(initialData.totalCount || 0);
  const [filter, setFilter] = useState<MonitoringFilter>("all");
  const [search, setSearch] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<GranteeRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const yearOptions = [{ value: "", label: "All Academic Years" }, ...academicYears.map((year) => ({ value: year.id, label: academicYearLabel(year) }))];

  const loadData = async (nextFilter = filter, nextPage = page, nextPerPage = perPage) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.getGrantees({ type: nextFilter, search: search.trim() || undefined, academic_year_id: academicYearId || undefined, offset: (nextPage - 1) * nextPerPage, limit: nextPerPage });
      setData(response?.grantees || []);
      setTotalRows(response?.totalCount || 0);
    } catch (requestError: any) {
      setError(requestError?.response?.data?.errorMessage || "Unable to load the monitoring list.");
    } finally {
      setLoading(false);
    }
  };

  const applySearch = async (event: FormEvent) => { event.preventDefault(); setPage(1); await loadData(filter, 1, perPage); };
  const changeFilter = async (next: MonitoringFilter) => { setFilter(next); setPage(1); await loadData(next, 1, perPage); };

  const getExportRows = async () => {
    const response = await api.getGrantees({ type: filter, search: search.trim() || undefined, academic_year_id: academicYearId || undefined, offset: 0, limit: Math.max(totalRows, 1) });
    return response?.grantees || [];
  };

  const exportExcel = async () => {
    setExporting(true); setError("");
    try {
      const rows = await getExportRows();
      const table = `<table><thead><tr>${exportColumns.map(([label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${exportColumns.map(([, key]) => `<td>${escapeHtml(row[key])}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      downloadBlob(`\uFEFF<html><head><meta charset="UTF-8"></head><body>${table}</body></html>`, "application/vnd.ms-excel;charset=utf-8", "monitoring-list.xls");
    } catch { setError("Unable to export the monitoring list to Excel."); } finally { setExporting(false); }
  };

  const exportPdf = async () => {
    setExporting(true); setError("");
    try { downloadBlob(createPdf(await getExportRows()), "application/pdf", "monitoring-list.pdf"); }
    catch { setError("Unable to export the monitoring list to PDF."); } finally { setExporting(false); }
  };

  const columns: TableColumn<GranteeRow>[] = useMemo(() => [
    { name: "Name of Scholarship", selector: (row) => row.grantName, sortable: true},
    { name: "Award Number", cell: (row) => row.studentId && row.awardNumber ? <Link className="font-medium text-primary hover:underline" href={`/settings/student-accounts/view/${row.studentId}`}>{row.awardNumber}</Link> : displayValue(row.awardNumber) },
    { name: "Complete Name of Student", selector: (row) => row.completeName, sortable: true},
    { name: "Gender", selector: (row) => String(displayValue(row.gender)), sortable: true },
    { name: "Year Level", selector: (row) => String(displayValue(row.yearLevel)), sortable: true },
    { name: "GWA", selector: (row) => String(displayValue(row.gwa)), sortable: true },
    { name: "Status", cell: (row) => <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(row.status)}`}>{row.status.charAt(0) + row.status.slice(1).toLowerCase()}</span>, sortable: true, selector: (row) => row.status },
    { name: "View", width: "80px", cell: (row) => <Button variants="text" onClick={() => setSelected(row)} startIcon={<FaRegEye size={20} />} /> },
  ], []);

  const detailRows = selected ? [
    ["Name of Scholarship", selected.grantName], 
    ["Academic Year", selected.academicYear], 
    ["Seq", selected.seq],
    ["Award Number", selected.awardNumber], 
    ["Grant (TDP/TES)", selected.grantName], 
    ["Batch", selected.batch], 
    ["Semester", selected.semester],
    ["Complete Name of Student", selected.completeName], 
    ["Gender", selected.gender], 
    ["Year Level", selected.yearLevel],
    ["Course", selected.course], 
    ["School", selected.school], 
    ["GWA", selected.gwa], 
    ["Status", selected.status.charAt(0) + selected.status.slice(1).toLowerCase()],
  ] : [];

  return <>
    <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {statusFilters.map((item) => <button key={item.value} onClick={() => changeFilter(item.value)} className={`rounded-lg border p-4 text-left transition ${filter === item.value ? "border-primary bg-primary text-white" : "border-stroke bg-white hover:border-primary dark:border-strokedark dark:bg-boxdark"}`}>
        <span className="block font-semibold">{item.label}</span><span className={`mt-1 block text-xs ${filter === item.value ? "text-white/80" : "text-gray-500"}`}>{item.description}</span>
      </button>)}
    </div>
    <div className="rounded-lg bg-white p-5 shadow-default dark:bg-boxdark">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <form onSubmit={applySearch} className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1"><label className="mb-2 block text-sm font-medium">Scholarship Name</label><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search scholarship" className="w-full rounded border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary dark:border-strokedark" /></div>
          <div className="min-w-65"><Select name="academicYear" label="Academic Year" options={yearOptions} value={yearOptions.find((year) => year.value === academicYearId) || yearOptions[0]} onChange={(option) => setAcademicYearId(option?.value || "")} /></div>
          <Button type="submit" className="bg-primary" startIcon={<FaSearch />}>Apply</Button>
        </form>
        <div className="flex gap-3">
          <Button onClick={exportExcel} disabled={exporting} className="bg-success" startIcon={<FaFileExcel />}>Excel</Button>
          <Button onClick={exportPdf} disabled={exporting} className="bg-danger" startIcon={<FaFilePdf />}>PDF</Button>
        </div>
      </div>
      {error && <div className="mb-5"><Alert variant="error" title="Error" message={error} showLink={false} /></div>}
      <DataTable 
        columns={columns} 
        data={data} 
        progressPending={loading} 
        pagination 
        paginationServer 
        paginationTotalRows={totalRows} 
        paginationPerPage={perPage} 
        paginationRowsPerPageOptions={[25, 50, 100]} 
        onChangePage={async (nextPage) => { setPage(nextPage); await loadData(filter, nextPage, perPage); }} 
        onChangeRowsPerPage={async (nextPerPage, nextPage) => { setPerPage(nextPerPage); setPage(nextPage); await loadData(filter, nextPage, nextPerPage); }} 
        highlightOnHover striped noDataComponent="No grantees found." 
      />
    </div>
    <Modal title="Grantee Monitoring Details" className="w-full max-w-3xl" isOpen={!!selected} onClose={() => setSelected(null)}>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        {detailRows.map(([label, value]) => <div key={String(label)} className="border-b border-stroke pb-3 dark:border-strokedark"><dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt><dd className="mt-1 font-medium text-black dark:text-white">{displayValue(value)}</dd></div>)}
      </dl>
    </Modal>
  </>;
};

export default MonitoringList;
