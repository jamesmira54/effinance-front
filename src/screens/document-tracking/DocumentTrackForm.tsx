"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Modal from "@/components/Modal";
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { DocumentTrack, DocumentTrackPayload, TrackCurrentUser } from "@/types/document-tracking.types";
import { toTrackError } from "./trackDisplay";

export interface TrackFormOptionsProps {
    processTypes: SelectOption[];
    purposes: SelectOption[];
    offices: SelectOption[];
    sponsorships: SelectOption[];
}

interface DocumentTrackFormProps {
    currentUser: TrackCurrentUser;
    options: TrackFormOptionsProps;
    initialTrack?: DocumentTrack;
    onSaved?: (track: DocumentTrack) => void;
    onCancel?: () => void;
}

interface FormValues {
    title: string;
    particulars: string;
    processTypeId: string;
    purposeId: string;
    sponsorshipId: string;
    destinationId: string;
}

const trackingAPI = new DocumentTrackingAPIService();

const validationSchema = Yup.object({
    title: Yup.string().trim().max(255, "Title must be at most 255 characters").required("Title of the document is required"),
    particulars: Yup.string().trim().required("Particulars are required"),
    processTypeId: Yup.string().required("Type of process is required"),
    purposeId: Yup.string().required("Purpose is required"),
    sponsorshipId: Yup.string().required("Sponsorship is required"),
    destinationId: Yup.string(),
});

const findOption = (options: SelectOption[], value: string) => options.find((option) => option.value === value) ?? null;

const DocumentTrackForm: React.FC<DocumentTrackFormProps> = ({ currentUser, options, initialTrack, onSaved, onCancel }) => {
    const router = useRouter();
    const isEdit = Boolean(initialTrack);
    // A ref, not state: the button click and form submit happen in the same event.
    const submitMode = useRef<"draft" | "submit">("draft");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const destinationOptions = options.offices.filter((office) => office.value !== currentUser.officeId);

    const save = async (values: FormValues, submit: boolean) => {
        setErrorMessage("");
        const payload: DocumentTrackPayload = {
            title: values.title.trim(),
            particulars: values.particulars.trim(),
            processTypeId: values.processTypeId,
            purposeId: values.purposeId,
            sponsorshipId: values.sponsorshipId,
            destinationId: values.destinationId || null,
        };

        try {
            const track = initialTrack
                ? await trackingAPI.update(initialTrack.id, payload)
                : await trackingAPI.create({ ...payload, submit });
            if (onSaved) {
                onSaved(track);
            } else {
                router.push(`/document-tracking/${track.id}`);
            }
        } catch (err) {
            const error = toTrackError(err);
            if (error.signedOut) {
                router.push("/login");
                return;
            }
            if (error.fieldErrors) formik.setErrors(error.fieldErrors);
            setErrorMessage(error.message);
        }
    };

    const formik = useFormik<FormValues>({
        initialValues: {
            title: initialTrack?.title ?? "",
            particulars: initialTrack?.particulars ?? "",
            processTypeId: initialTrack?.processTypeId ?? "",
            purposeId: initialTrack?.purposeId ?? "",
            sponsorshipId: initialTrack?.sponsorshipId ?? "",
            destinationId: initialTrack?.intendedDestinationId ?? "",
        },
        validationSchema,
        onSubmit: async (values, { setFieldError, setFieldTouched }) => {
            if (!isEdit && submitMode.current === "submit") {
                if (!values.destinationId) {
                    setFieldTouched("destinationId", true, false);
                    setFieldError("destinationId", "Destination is required to submit");
                    return;
                }
                setConfirmOpen(true);
                return;
            }
            await save(values, false);
        },
    });

    const confirmSubmit = async () => {
        setConfirmOpen(false);
        formik.setSubmitting(true);
        await save(formik.values, true);
        formik.setSubmitting(false);
    };

    const fieldError = (field: keyof FormValues) => (formik.touched[field] || formik.submitCount > 0 ? formik.errors[field] : "") || "";

    const selectField = (field: keyof FormValues, label: string, fieldOptions: SelectOption[]) => (
        <Select
            name={field}
            label={label}
            placeholder={`Select ${label.toLowerCase()}`}
            options={fieldOptions}
            value={findOption(fieldOptions, formik.values[field])}
            onChange={(option) => formik.setFieldValue(field, (option as SelectOption | null)?.value ?? "")}
            onBlur={() => formik.setFieldTouched(field, true)}
            error={Boolean(fieldError(field))}
            errorMessage={fieldError(field)}
            noOptionsMessage={`No ${label.toLowerCase()} available`}
        />
    );

    const destinationName = findOption(destinationOptions, formik.values.destinationId)?.label ?? "";

    return (
        <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
            {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}

            <Input
                id="title"
                name="title"
                label="Title of the Document"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("title", true)}
                error={Boolean(fieldError("title"))}
                errorMessage={fieldError("title")}
            />

            <div>
                <label htmlFor="particulars" className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                    Particulars
                </label>
                <textarea
                    id="particulars"
                    name="particulars"
                    rows={5}
                    placeholder="List the documents submitted or attached"
                    aria-invalid={Boolean(fieldError("particulars"))}
                    aria-describedby={fieldError("particulars") ? "particulars-error" : undefined}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.particulars}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {fieldError("particulars") && (
                    <p id="particulars-error" className="text-meta-1">{fieldError("particulars")}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {selectField("processTypeId", "Type of Process", options.processTypes)}
                {selectField("purposeId", "Purpose", options.purposes)}
                {selectField("sponsorshipId", "Sponsorship", options.sponsorships)}
                {selectField("destinationId", "Destination", destinationOptions)}
            </div>

            <div className="flex flex-wrap justify-end gap-3">
                {formik.isSubmitting ? (
                    <Throbber />
                ) : isEdit ? (
                    <>
                        {onCancel && <Button type="button" variants="outlined" onClick={onCancel}>Cancel</Button>}
                        <Button type="submit" className="bg-primary">Save Changes</Button>
                    </>
                ) : (
                    <>
                        <Button type="submit" variants="outlined" onClick={() => { submitMode.current = "draft"; }}>
                            Save as Draft
                        </Button>
                        <Button type="submit" className="bg-primary" onClick={() => { submitMode.current = "submit"; }}>
                            Create &amp; Submit
                        </Button>
                    </>
                )}
            </div>

            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit track?" className="max-w-lg">
                <p className="mb-6">This document will be sent to <strong>{destinationName}</strong>.</p>
                <div className="flex justify-end gap-3">
                    <Button type="button" variants="outlined" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button type="button" className="bg-primary" onClick={confirmSubmit}>Submit</Button>
                </div>
            </Modal>
        </form>
    );
};

export default DocumentTrackForm;
