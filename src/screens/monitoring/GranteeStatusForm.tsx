"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Select from "@/components/Inputs/Select/Select";
import Throbber from "@/components/common/Throbber";
import { MonitoringAPIService } from "@/api";
import { GranteeRow, GranteeStatusTarget } from "@/types/monitoring.types";

const api = new MonitoringAPIService();

// Active grantees can leave the grant; an LOA grantee can only be reinstated.
const targetOptions = (status: GranteeRow["status"]): { value: GranteeStatusTarget; label: string }[] =>
  status === "LOA"
    ? [{ value: "AWARDED", label: "Reinstate (Active)" }]
    : [
        { value: "DELISTED", label: "Delisted" },
        { value: "GRADUATED", label: "Graduated" },
        { value: "LOA", label: "Leave of Absence (LOA)" },
      ];

const GranteeStatusForm = ({ grantee, onSuccess }: { grantee: GranteeRow; onSuccess: () => void }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const options = targetOptions(grantee.status);

  const formik = useFormik({
    initialValues: { status: options.length === 1 ? options[0].value : "", remarks: "" },
    validationSchema: Yup.object({
      status: Yup.string().required("Select a status"),
      // Reinstatement needs no reason; every other change does (e.g. the graduation date).
      remarks: Yup.string().when("status", {
        is: (status: string) => status !== "AWARDED",
        then: (schema) => schema.trim().required("Remarks are required"),
      }),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        await api.updateGranteeStatus(grantee.applicationId, {
          status: values.status as GranteeStatusTarget,
          remarks: values.remarks.trim() || undefined,
        });
        onSuccess();
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.errorMessage || error?.message || "Unable to update the grantee status.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
      {errorMessage && <Alert variant="error" title="Error" message={errorMessage} showLink={false} />}

      <p className="text-sm text-body dark:text-bodydark">{grantee.completeName} · {grantee.grantName}</p>

      <Select
        name="status"
        label="Update Status"
        options={options}
        value={options.find((option) => option.value === formik.values.status) ?? null}
        onChange={(option) => formik.setFieldValue("status", option?.value ?? "")}
        error={Boolean(formik.touched.status && formik.errors.status)}
        errorMessage={formik.errors.status}
      />

      <div>
        <label htmlFor="grantee-remarks" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Remarks{formik.values.status !== "AWARDED" && <span className="text-danger"> *</span>}
        </label>
        <textarea
          id="grantee-remarks"
          name="remarks"
          rows={4}
          placeholder="Reason for the status change (e.g. graduation date)"
          value={formik.values.remarks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
        {formik.touched.remarks && formik.errors.remarks && (
          <p className="mt-2 text-sm text-danger">{formik.errors.remarks}</p>
        )}
      </div>

      <div className="flex justify-end">
        {formik.isSubmitting ? <Throbber /> : <Button type="submit" className="bg-primary">Update Status</Button>}
      </div>
    </form>
  );
};

export default GranteeStatusForm;
