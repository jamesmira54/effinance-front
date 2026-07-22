"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@/components/Alert";
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import Throbber from "@/components/common/Throbber";
import { ScheduleAPIService } from "@/api";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { Schedule, ScheduleRequest } from "@/types/schedule.types";

type FormValues = Omit<ScheduleRequest, "startDate" | "endDate"> & {
  specificDate: string;
  startTime: string;
  endTime: string;
};

const fieldClass = "w-full rounded-lg border border-stroke bg-white px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white";

const toLocalDateParts = (value?: string) => {
  if (!value) return { date: "", time: "" };
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  };
};

const ScheduleForm = ({ sponsorships, initialData, onSuccess }: {
  sponsorships: APISponsorshipListResponse[];
  initialData?: Schedule | null;
  onSuccess: (schedule: Schedule) => void;
}) => {
  const scheduleAPI = new ScheduleAPIService();
  const [message, setMessage] = useState<{ error: boolean; text: string } | null>(null);
  const sponsorshipOptions = sponsorships.map((item) => ({ value: item.id, label: item.name }));
  const scheduleTypeOptions = [{ value: "TEST", label: "Exam" }, { value: "INTERVIEW", label: "Interview" }];
  const examinationTypeOptions = [{ value: "ONSITE", label: "Onsite" }, { value: "ONLINE", label: "Online" }];
  const initialStart = toLocalDateParts(initialData?.startDate);
  const initialEnd = toLocalDateParts(initialData?.endDate);

  const formik = useFormik<FormValues>({
    initialValues: {
      sponsorshipId: initialData?.sponsorshipId || "",
      batchNo: initialData?.batchNo || 1,
      batchCode: initialData?.batchCode || "",
      scheduleType: initialData?.scheduleType || "TEST",
      examinationType: initialData?.examinationType || "ONSITE",
      proctorInterviewer: initialData?.proctorInterviewer || "",
      location: initialData?.location || "",
      scheduleQuota: initialData?.scheduleQuota || 1,
      specificDate: initialStart.date,
      startTime: initialStart.time,
      endTime: initialEnd.time,
    },
    validationSchema: Yup.object({
      sponsorshipId: Yup.string().required("Sponsor is required"),
      batchNo: Yup.number().integer().min(1).required("Batch is required"),
      batchCode: Yup.string().trim().required("Batch code is required"),
      scheduleType: Yup.string().oneOf(["TEST", "INTERVIEW"]).required(),
      examinationType: Yup.string().oneOf(["ONSITE", "ONLINE"]).required(),
      specificDate: Yup.string().required("Specific date is required"),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
      scheduleQuota: Yup.number().integer().min(1, "Limit must be at least 1").required("Limit is required"),
      location: Yup.string().trim().required("Building/Room is required"),
      proctorInterviewer: Yup.string().trim().required("Proctor/Interviewer is required"),
    }),
    onSubmit: async (values, helpers) => {
      setMessage(null);
      try {
        const startDate = new Date(`${values.specificDate}T${values.startTime}`).toISOString();
        const endDate = new Date(`${values.specificDate}T${values.endTime}`).toISOString();
        if (new Date(endDate) <= new Date(startDate)) {
          helpers.setFieldError("endTime", "End time must be after start time");
          return;
        }
        const { specificDate, startTime, endTime, ...rest } = values;
        const payload = { ...rest, startDate, endDate };
        const saved = initialData?.id
          ? await scheduleAPI.updateSchedule(initialData.id, payload)
          : await scheduleAPI.createSchedule(payload);
        setMessage({ error: false, text: `Schedule ${initialData?.id ? "updated" : "added"} successfully.` });
        onSuccess(saved);
      } catch (error: any) {
        setMessage({
          error: true,
          text: error?.response?.data?.description || error?.response?.data?.errorMessage || `Unable to ${initialData?.id ? "update" : "add"} the schedule.`,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const errorFor = (name: keyof FormValues) => formik.touched[name] && formik.errors[name];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Select name="sponsorshipId" label="Sponsor" options={sponsorshipOptions}
          value={sponsorshipOptions.find((option) => option.value === formik.values.sponsorshipId) || null}
          onChange={(option) => formik.setFieldValue("sponsorshipId", option?.value || "")}
          onBlur={() => formik.setFieldTouched("sponsorshipId")} error={!!errorFor("sponsorshipId")} errorMessage={formik.errors.sponsorshipId} />
        <Input name="batchNo" label="Batch" type="number" min={1} value={formik.values.batchNo} onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched("batchNo")} error={!!errorFor("batchNo")} errorMessage={formik.errors.batchNo as string} />
        <Input name="batchCode" label="Batch Code" value={formik.values.batchCode} onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched("batchCode")} error={!!errorFor("batchCode")} errorMessage={formik.errors.batchCode} />
        <Select name="scheduleType" label="Type of Schedule" options={scheduleTypeOptions}
          value={scheduleTypeOptions.find((option) => option.value === formik.values.scheduleType)}
          onChange={(option) => formik.setFieldValue("scheduleType", option?.value)} />
        <Select name="examinationType" label="Examination Type" options={examinationTypeOptions}
          value={examinationTypeOptions.find((option) => option.value === formik.values.examinationType)}
          onChange={(option) => formik.setFieldValue("examinationType", option?.value)} />
        <Input name="specificDate" label="Specific Date" type="date" value={formik.values.specificDate} onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched("specificDate")} error={!!errorFor("specificDate")} errorMessage={formik.errors.specificDate} />
        <div><label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Time Start</label><input className={fieldClass} type="time" name="startTime" value={formik.values.startTime} onChange={formik.handleChange} onBlur={formik.handleBlur}/>{errorFor("startTime") && <p className="text-meta-1">{formik.errors.startTime}</p>}</div>
        <div><label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Time End</label><input className={fieldClass} type="time" name="endTime" value={formik.values.endTime} onChange={formik.handleChange} onBlur={formik.handleBlur}/>{errorFor("endTime") && <p className="text-meta-1">{formik.errors.endTime}</p>}</div>
        <Input name="scheduleQuota" label="Limit (Examinees/Interviewees)" type="number" min={1} value={formik.values.scheduleQuota} onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched("scheduleQuota")} error={!!errorFor("scheduleQuota")} errorMessage={formik.errors.scheduleQuota as string} />
        <Input name="location" label="Building/Room" value={formik.values.location} onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched("location")} error={!!errorFor("location")} errorMessage={formik.errors.location} />
        <div className="md:col-span-2"><Input name="proctorInterviewer" label="Proctor/Interviewer" value={formik.values.proctorInterviewer} onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched("proctorInterviewer")} error={!!errorFor("proctorInterviewer")} errorMessage={formik.errors.proctorInterviewer} /></div>
      </div>
      <div className="mt-6 flex justify-end">
        {formik.isSubmitting ? <Throbber /> : <button type="submit" className="rounded-lg bg-primary px-8 py-3 text-white hover:bg-opacity-90">{initialData?.id ? "Update Schedule" : "Add Schedule"}</button>}
      </div>
      {message && <div className="mt-5"><Alert variant={message.error ? "error" : "success"} title={message.error ? "Error" : "Success!"} message={message.text} showLink={false} /></div>}
    </form>
  );
};

export default ScheduleForm;
