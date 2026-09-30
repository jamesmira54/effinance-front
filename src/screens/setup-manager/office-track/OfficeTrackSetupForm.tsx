"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Inputs/Input";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { SetupItem, SetupKind, SetupPayload } from "@/types/document-tracking.types";
import { toTrackError } from "@/screens/document-tracking/trackDisplay";

interface OfficeTrackSetupFormProps {
    kind: SetupKind;
    item?: SetupItem;
    onSaved: (item: SetupItem) => void;
    onCancel: () => void;
}

const trackingAPI = new DocumentTrackingAPIService();

const validationSchema = Yup.object({
    name: Yup.string().trim().max(150, "Name must be at most 150 characters").required("Name is required"),
    sortOrder: Yup.number()
        .transform((value, original) => (original === "" ? undefined : value))
        .typeError("Sort order must be a number")
        .integer("Sort order must be a whole number")
        .min(0, "Sort order must be 0 or more"),
});

const OfficeTrackSetupForm: React.FC<OfficeTrackSetupFormProps> = ({ kind, item, onSaved, onCancel }) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const formik = useFormik({
        initialValues: {
            name: item?.name ?? "",
            sortOrder: item ? String(item.sortOrder) : "",
            isActive: item?.isActive ?? true,
        },
        validationSchema,
        onSubmit: async (values) => {
            setErrorMessage("");
            const payload: SetupPayload = { name: values.name.trim(), isActive: values.isActive };
            // Formik stores a typed number input as a number, and a cleared one as "".
            const sortOrder = String(values.sortOrder ?? "").trim();
            if (sortOrder !== "") payload.sortOrder = Number(sortOrder);

            try {
                const saved = item
                    ? await trackingAPI.setupUpdate(kind, item.id, payload)
                    : await trackingAPI.setupCreate(kind, payload);
                onSaved(saved);
            } catch (err) {
                const error = toTrackError(err);
                if (error.signedOut) {
                    router.push("/login");
                    return;
                }
                if (error.fieldErrors) formik.setErrors(error.fieldErrors);
                setErrorMessage(error.message);
            }
        },
    });

    const fieldError = (field: "name" | "sortOrder") => (formik.touched[field] && formik.errors[field]) || "";

    return (
        <form onSubmit={formik.handleSubmit} noValidate className="flex min-w-[320px] flex-col gap-5">
            {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}

            <Input
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("name", true)}
                error={Boolean(fieldError("name"))}
                errorMessage={fieldError("name")}
            />

            <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                min={0}
                label="Sort Order (optional)"
                value={formik.values.sortOrder}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("sortOrder", true)}
                error={Boolean(fieldError("sortOrder"))}
                errorMessage={fieldError("sortOrder")}
            />

            <label htmlFor="isActive" className="flex items-center gap-3 text-sm font-medium text-black dark:text-white">
                <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formik.values.isActive}
                    onChange={formik.handleChange}
                    className="h-5 w-5"
                />
                Active (shown in form dropdowns)
            </label>

            <div className="flex justify-end gap-3">
                {formik.isSubmitting ? (
                    <Throbber />
                ) : (
                    <>
                        <Button type="button" variants="outlined" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" className="bg-primary">{item ? "Save Changes" : "Add"}</Button>
                    </>
                )}
            </div>
        </form>
    );
};

export default OfficeTrackSetupForm;
