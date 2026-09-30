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
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { DocumentTrack, DocumentTrackPayload, ProcessType, TrackCurrentUser, TrackPurpose } from "@/types/document-tracking.types";
import { PROCESS_TYPE_OPTIONS, TRACK_OFFICES, TRACK_PURPOSE_OPTIONS } from "@/utils/constant";

interface DocumentTrackFormProps {
    currentUser: TrackCurrentUser;
    sponsorshipOptions: SelectOption[];
    initialTrack?: DocumentTrack;
    onSaved?: (track: DocumentTrack) => void;
}

interface FormValues {
    title: string;
    particulars: string;
    processType: string;
    purpose: string;
    sponsorshipId: string;
    destination: string;
}

const trackingAPI = new DocumentTrackingAPIService();
const destinationOptions: SelectOption[] = TRACK_OFFICES.map((office) => ({ label: office, value: office }));

const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title of the document is required"),
    particulars: Yup.string().trim().required("Particulars are required"),
    processType: Yup.string().required("Type of process is required"),
    purpose: Yup.string().required("Purpose is required"),
    sponsorshipId: Yup.string().required("Sponsorship is required"),
    destination: Yup.string().required("Destination is required"),
});

const findOption = (options: SelectOption[], value: string) => options.find((option) => option.value === value) ?? null;

const DocumentTrackForm: React.FC<DocumentTrackFormProps> = ({ currentUser, sponsorshipOptions, initialTrack, onSaved }) => {
    const router = useRouter();
    // A ref, not state: the button click and form submit happen in the same event.
    const submitMode = useRef<"draft" | "submit">("draft");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const isEdit = Boolean(initialTrack);

    const formik = useFormik<FormValues>({
        initialValues: {
            title: initialTrack?.title ?? "",
            particulars: initialTrack?.particulars ?? "",
            processType: initialTrack?.processType ?? "",
            purpose: initialTrack?.purpose ?? "",
            sponsorshipId: initialTrack?.sponsorshipId ?? "",
            destination: initialTrack?.history[0]?.toOffice ?? "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setErrorMessage("");
            const payload: DocumentTrackPayload = {
                title: values.title.trim(),
                particulars: values.particulars.trim(),
                processType: values.processType as ProcessType,
                purpose: values.purpose as TrackPurpose,
                sponsorshipId: values.sponsorshipId,
                sponsorshipName: findOption(sponsorshipOptions, values.sponsorshipId)?.label ?? "",
                destination: values.destination,
            };
            const actor = { userId: currentUser.userId, name: currentUser.name, office: currentUser.userType };
            const asDraft = submitMode.current === "draft";

            try {
                const track = initialTrack
                    ? await trackingAPI.updateDraft(initialTrack.id, payload, actor, !asDraft)
                    : await trackingAPI.createTrack(payload, actor, asDraft);
                if (onSaved) {
                    onSaved(track);
                } else {
                    router.push(`/document-tracking/${track.id}`);
                }
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : "Unable to save the track.");
            }
        },
    });

    const fieldError = (field: keyof FormValues) => (formik.touched[field] && formik.errors[field]) || "";

    const selectField = (field: keyof FormValues, label: string, options: SelectOption[]) => (
        <Select
            id={field}
            name={field}
            label={label}
            placeholder={`Select ${label.toLowerCase()}`}
            options={options}
            value={findOption(options, formik.values[field])}
            onChange={(option) => formik.setFieldValue(field, (option as SelectOption | null)?.value ?? "")}
            onBlur={() => formik.setFieldTouched(field, true)}
            error={Boolean(fieldError(field))}
            errorMessage={fieldError(field)}
        />
    );

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
                {selectField("processType", "Type of Process", PROCESS_TYPE_OPTIONS)}
                {selectField("purpose", "Purpose", TRACK_PURPOSE_OPTIONS)}
                {selectField("sponsorshipId", "Sponsorship", sponsorshipOptions)}
                {selectField("destination", "Destination", destinationOptions)}
            </div>

            <div className="flex flex-wrap justify-end gap-3">
                {formik.isSubmitting ? (
                    <Throbber />
                ) : (
                    <>
                        <Button type="submit" variants="outlined" onClick={() => { submitMode.current = "draft"; }}>
                            {isEdit ? "Save Draft" : "Create as Draft"}
                        </Button>
                        <Button type="submit" className="bg-primary" onClick={() => { submitMode.current = "submit"; }}>
                            {isEdit ? "Save and Submit" : "Create and Submit"}
                        </Button>
                    </>
                )}
            </div>
        </form>
    );
};

export default DocumentTrackForm;
