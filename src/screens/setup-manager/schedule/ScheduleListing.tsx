"use client";

import { useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { CiSquarePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { ScheduleAPIService } from "@/api";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { Schedule } from "@/types/schedule.types";
import ScheduleForm from "./ScheduleForm";

const formatDate = (value: string) => new Intl.DateTimeFormat("en-PH", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
const formatTime = (value: string) => new Intl.DateTimeFormat("en-PH", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
const scheduleLabel = (value: Schedule["scheduleType"]) => value === "TEST" ? "Exam" : "Interview";
const examinationLabel = (value: Schedule["examinationType"]) => value ? value.charAt(0) + value.slice(1).toLowerCase() : "—";

const ScheduleListing = ({ serverData }: { serverData: { schedules: Schedule[]; sponsorships: APISponsorshipListResponse[] } }) => {
  const scheduleAPI = new ScheduleAPIService();
  const [data, setData] = useState(serverData.schedules || []);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [selected, setSelected] = useState<Schedule | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Schedule | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      await scheduleAPI.deleteSchedule(pendingDelete.id);
      setData((items) => items.filter((item) => item.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (error: any) {
      setDeleteError(error?.response?.data?.description || error?.response?.data?.errorMessage || "Unable to delete the schedule.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: TableColumn<Schedule>[] = useMemo(() => [
    { name: "Sponsor", selector: (row) => row.sponsorshipName || "—", sortable: true },
    { name: "Batch", selector: (row) => row.batchNo, sortable: true },
    { name: "Type of Schedule", selector: (row) => scheduleLabel(row.scheduleType), sortable: true },
    { name: "Examination Type", selector: (row) => examinationLabel(row.examinationType), sortable: true },
    { name: "Specific Date", selector: (row) => formatDate(row.startDate), sortable: true },
    { name: "Time Start and End", selector: (row) => `${formatTime(row.startDate)} – ${formatTime(row.endDate)}` },
    { name: "Proctor/Interviewer", selector: (row) => row.proctorInterviewer || "—" },
    { name: "Action", width: "150px", cell: (row) => <div className="flex items-center gap-3">
      <Button variants="text" onClick={() => setSelected(row)} startIcon={<FaRegEye size={20} />} />
      <Button variants="text" onClick={() => { setEditing(row); setShowForm(true); }} startIcon={<CiEdit size={22} />} />
      <Button variants="text" onClick={() => { setDeleteError(""); setPendingDelete(row); }} startIcon={<RiDeleteBin5Line size={20} />} />
    </div> },
  ], []);

  const details = selected ? [
    ["Sponsor", selected.sponsorshipName || "—"], ["Batch", selected.batchNo], ["Batch Code", selected.batchCode || "—"],
    ["Type of Schedule", scheduleLabel(selected.scheduleType)], ["Examination Type", examinationLabel(selected.examinationType)],
    ["Specific Date", formatDate(selected.startDate)], ["Limit (Examinees/Interviewees)", selected.scheduleQuota],
    ["Time Start and End", `${formatTime(selected.startDate)} – ${formatTime(selected.endDate)}`], ["Building/Room", selected.location],
    ["Proctor/Interviewer", selected.proctorInterviewer || "—"],
  ] : [];

  return <>
    <div className="max-w-full overflow-x-auto">
      <DataTable columns={columns} data={data} pagination highlightOnHover striped noDataComponent="No schedules found." />
      <Button onClick={() => { setEditing(null); setShowForm(true); }} style={{ marginTop: 30 }} startIcon={<CiSquarePlus size={24} />} className="bg-primary">Add Schedule</Button>
    </div>
    <Modal isFullscreen title={editing ? "Edit Schedule" : "Add Schedule"} className="max-w-180" isOpen={showForm} onClose={() => { setShowForm(false); setEditing(null); }}>
      <ScheduleForm sponsorships={serverData.sponsorships} initialData={editing} onSuccess={(saved) => {
        const sponsorshipName = serverData.sponsorships.find((item) => item.id === saved.sponsorshipId)?.name || saved.sponsorshipName;
        const normalized = { ...saved, sponsorshipName };
        setData((items) => editing ? items.map((item) => item.id === normalized.id ? normalized : item) : [normalized, ...items]);
        setShowForm(false);
        setEditing(null);
      }} />
    </Modal>
    <Modal title="Schedule Details" className="w-full max-w-2xl" isOpen={!!selected} onClose={() => setSelected(null)}>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        {details.map(([label, value]) => <div key={String(label)} className="border-b border-stroke pb-3 dark:border-strokedark"><dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt><dd className="mt-1 font-medium text-black dark:text-white">{value}</dd></div>)}
      </dl>
    </Modal>
    <Modal isTextCentered title="Delete Schedule?" className="w-full max-w-md" isOpen={!!pendingDelete} onClose={() => { if (!isDeleting) { setPendingDelete(null); setDeleteError(""); } }}>
      <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
        This will delete the schedule for {pendingDelete?.sponsorshipName || "the selected sponsor"}, batch {pendingDelete?.batchNo}.
      </p>
      {deleteError && <div className="mt-5 text-left"><Alert variant="error" title="Delete failed" message={deleteError} showLink={false} /></div>}
      <div className="mt-8 flex items-center justify-center gap-6">
        <Button className="bg-primary" disabled={isDeleting} onClick={() => { setPendingDelete(null); setDeleteError(""); }}>Cancel</Button>
        {isDeleting ? <Throbber /> : <Button className="bg-danger" onClick={confirmDelete}>Delete</Button>}
      </div>
    </Modal>
  </>;
};

export default ScheduleListing;
