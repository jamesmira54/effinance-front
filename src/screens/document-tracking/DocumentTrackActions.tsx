"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { DocumentTrackingAPIService } from "@/api";
import { allowedActions } from "@/api/document-tracking-api";
import { DocumentTrack, ReceiverAction, TrackCurrentUser } from "@/types/document-tracking.types";
import { TRACK_ROUTING_OFFICES } from "@/utils/constant";

interface DocumentTrackActionsProps {
    track: DocumentTrack;
    currentUser: TrackCurrentUser;
    onUpdated: (track: DocumentTrack) => void;
}

const trackingAPI = new DocumentTrackingAPIService();

const ACTION_LABEL: Record<ReceiverAction, string> = {
    ACCEPT: "In-Processed (Accept)",
    FORWARD: "Forward to Other Office",
    RETURN: "Return",
    DONE: "Mark as Done",
};

const REMARKS_LABEL: Record<ReceiverAction, string> = {
    ACCEPT: "",
    FORWARD: "Remarks / Routing Notes",
    RETURN: "Return Reason",
    DONE: "Final Remarks / Release Details",
};

const DocumentTrackActions: React.FC<DocumentTrackActionsProps> = ({ track, currentUser, onUpdated }) => {
    const actions = allowedActions(track, currentUser.userType);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const destinationOptions: SelectOption[] = TRACK_ROUTING_OFFICES
        .filter((office) => office !== track.currentHolder)
        .map((office) => ({ label: office, value: office }));

    const formik = useFormik({
        initialValues: { action: actions[0] ?? "", destination: "", remarks: "" },
        enableReinitialize: true,
        validationSchema: Yup.object({
            action: Yup.string().required("Select an action"),
            destination: Yup.string().when("action", {
                is: "FORWARD",
                then: (schema) => schema.required("Destination office is required"),
            }),
            remarks: Yup.string().when("action", {
                is: (action: string) => action !== "ACCEPT",
                then: (schema) => schema.trim().required("This field is required"),
            }),
        }),
        onSubmit: async (values, { resetForm }) => {
            setErrorMessage("");
            try {
                const updated = await trackingAPI.applyAction(
                    track.id,
                    values.action as ReceiverAction,
                    { destination: values.destination, remarks: values.remarks },
                    { userId: currentUser.userId, name: currentUser.name, office: currentUser.userType },
                );
                resetForm();
                onUpdated(updated);
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : "Unable to update the track.");
            }
        },
    });

    if (actions.length === 0) return null;

    const action = formik.values.action as ReceiverAction;
    const actionOptions: SelectOption[] = actions.map((item) => ({ label: ACTION_LABEL[item], value: item }));
    const remarksError = (formik.touched.remarks && formik.errors.remarks) || "";
    const destinationError = (formik.touched.destination && formik.errors.destination) || "";

    return (
        <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5 print:hidden">
            <h3 className="text-lg font-semibold text-black dark:text-white">Receiver Action</h3>

            {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}

            <Select
                id="action"
                name="action"
                label="Select Action"
                options={actionOptions}
                value={actionOptions.find((option) => option.value === action) ?? null}
                onChange={(option) => {
                    formik.setFieldValue("action", (option as SelectOption | null)?.value ?? "");
                    formik.setFieldTouched("remarks", false);
                    formik.setFieldTouched("destination", false);
                }}
            />

            {action === "FORWARD" && (
                <Select
                    id="destination"
                    name="destination"
                    label="Destination Office"
                    placeholder="Select destination office"
                    options={destinationOptions}
                    value={destinationOptions.find((option) => option.value === formik.values.destination) ?? null}
                    onChange={(option) => formik.setFieldValue("destination", (option as SelectOption | null)?.value ?? "")}
                    onBlur={() => formik.setFieldTouched("destination", true)}
                    error={Boolean(destinationError)}
                    errorMessage={destinationError}
                />
            )}

            {action !== "ACCEPT" && (
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
            )}

            <div className="flex justify-end">
                {formik.isSubmitting ? (
                    <Throbber />
                ) : (
                    <Button type="submit" className="bg-primary">{ACTION_LABEL[action] ?? "Submit"}</Button>
                )}
            </div>
        </form>
    );
};

export default DocumentTrackActions;
