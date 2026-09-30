"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { DocumentTrack, ReceiverAction, ReceiverActionFields, TrackCurrentUser } from "@/types/document-tracking.types";
import { TRACK_STATUS } from "@/utils/constant";
import { toTrackError } from "./trackDisplay";

interface DocumentTrackActionsProps {
    track: DocumentTrack;
    currentUser: TrackCurrentUser;
    offices: SelectOption[];
    onUpdated: (track: DocumentTrack) => void;
    onReload: () => void;
}

const trackingAPI = new DocumentTrackingAPIService();

const REMARKS_REQUIRED: ReceiverAction[] = ["FORWARD", "RETURN", "DONE"];
const NEEDS_DESTINATION: ReceiverAction[] = ["FORWARD", "SUBMIT"];

const REMARKS_LABEL: Record<ReceiverAction, string> = {
    SUBMIT: "Remarks (optional)",
    ACCEPT: "Remarks (optional)",
    FORWARD: "Remarks",
    RETURN: "Return Reason",
    DONE: "Final Remarks / Release Details",
};

const runAction = (action: ReceiverAction, trackId: string, fields: ReceiverActionFields) => {
    switch (action) {
        case "SUBMIT": return trackingAPI.submit(trackId, fields);
        case "ACCEPT": return trackingAPI.accept(trackId, fields);
        case "FORWARD": return trackingAPI.forward(trackId, fields);
        case "RETURN": return trackingAPI.returnTrack(trackId, fields);
        case "DONE": return trackingAPI.done(trackId, fields);
    }
};

const DocumentTrackActions: React.FC<DocumentTrackActionsProps> = ({ track, currentUser, offices, onUpdated, onReload }) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const actions = track.allowedActions.filter((action): action is ReceiverAction => action !== "EDIT");

    const actionLabel = (action: ReceiverAction) => ({
        SUBMIT: track.status === TRACK_STATUS.RETURNED ? "Resubmit" : "Submit",
        ACCEPT: "In-Process / Acknowledge",
        FORWARD: "Forward",
        RETURN: "Return",
        DONE: "Mark as Done",
    })[action];

    const formik = useFormik({
        initialValues: {
            action: (actions[0] ?? "") as string,
            destinationId: actions[0] === "SUBMIT" ? track.intendedDestinationId ?? "" : "",
            remarks: "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            action: Yup.string().required("Select an action"),
            destinationId: Yup.string().when("action", {
                is: (action: string) => NEEDS_DESTINATION.includes(action as ReceiverAction),
                then: (schema) => schema.required("Destination office is required"),
            }),
            remarks: Yup.string().when("action", {
                is: (action: string) => REMARKS_REQUIRED.includes(action as ReceiverAction),
                then: (schema) => schema.trim().required("This field is required"),
            }),
        }),
        onSubmit: async (values) => {
            setErrorMessage("");
            const action = values.action as ReceiverAction;
            const fields: ReceiverActionFields = {};
            if (NEEDS_DESTINATION.includes(action)) fields.destinationId = values.destinationId;
            if (values.remarks.trim()) fields.remarks = values.remarks.trim();

            try {
                onUpdated(await runAction(action, track.id, fields));
            } catch (err) {
                const error = toTrackError(err);
                if (error.signedOut) {
                    router.push("/login");
                    return;
                }
                if (error.fieldErrors) formik.setErrors(error.fieldErrors);
                setErrorMessage(error.message);
                if (error.reload) onReload();
            }
        },
    });

    if (actions.length === 0) return null;

    const action = formik.values.action as ReceiverAction;
    const actionOptions: SelectOption[] = actions.map((item) => ({ label: actionLabel(item), value: item }));
    const excludedOffice = action === "FORWARD" ? track.currentOfficeId : currentUser.officeId;
    const destinationOptions = offices.filter((office) => office.value !== excludedOffice);
    const remarksError = (formik.touched.remarks && formik.errors.remarks) || "";
    const destinationError = (formik.touched.destinationId && formik.errors.destinationId) || "";

    return (
        <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
            <h3 className="text-lg font-semibold text-black dark:text-white">Action</h3>

            {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}

            <Select
                name="action"
                label="Select Action"
                options={actionOptions}
                value={actionOptions.find((option) => option.value === action) ?? null}
                onChange={(option) => {
                    const next = (option as SelectOption | null)?.value ?? "";
                    formik.setValues({
                        action: next,
                        destinationId: next === "SUBMIT" ? track.intendedDestinationId ?? "" : "",
                        remarks: formik.values.remarks,
                    });
                    formik.setTouched({});
                }}
            />

            {NEEDS_DESTINATION.includes(action) && (
                <Select
                    name="destinationId"
                    label="Destination Office"
                    placeholder="Select destination office"
                    options={destinationOptions}
                    value={destinationOptions.find((option) => option.value === formik.values.destinationId) ?? null}
                    onChange={(option) => formik.setFieldValue("destinationId", (option as SelectOption | null)?.value ?? "")}
                    onBlur={() => formik.setFieldTouched("destinationId", true)}
                    error={Boolean(destinationError)}
                    errorMessage={destinationError}
                />
            )}

            <div>
                <label htmlFor="remarks" className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                    {REMARKS_LABEL[action]}
                </label>
                <textarea
                    id="remarks"
                    name="remarks"
                    rows={4}
                    aria-invalid={Boolean(remarksError)}
                    aria-describedby={remarksError ? "remarks-error" : undefined}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {remarksError && <p id="remarks-error" className="text-meta-1">{remarksError}</p>}
            </div>

            <div className="flex justify-end">
                {formik.isSubmitting ? (
                    <Throbber />
                ) : (
                    <Button type="submit" className="bg-primary">{actionLabel(action) ?? "Submit"}</Button>
                )}
            </div>
        </form>
    );
};

export default DocumentTrackActions;
