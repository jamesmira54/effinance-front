import { useMemo, useState } from "react";
import { ApplicationFormProps } from "./Application.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@/components/Alert/Alert";
import Select from '@/components/Inputs/Select';
import { APPLICATION_STAGE, APPLICATION_STATUS } from "@/utils/constant";
import Throbber from "@/components/common/Throbber";
import { ApplicationAPIService } from "@/api";

const ApplicationForm: React.FC<
{
    initialData: any, 
    onSuccess: (item: any) => void
}> = ({
    initialData,
    onSuccess
}) => {

    const ApplicationAPI = new ApplicationAPIService();
    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const initialValues = useMemo<ApplicationFormProps>(() => ({
        studentId: initialData.studentId,
        sponsorshipId: initialData.sponsorshipId,
        appStage: initialData.appStage || APPLICATION_STAGE.POOLING,
        appStatus: initialData.appStatus || APPLICATION_STATUS.PENDING_POOLING,
        remarks: initialData.remarks || "",
    }), [initialData]);

    const formik = useFormik<ApplicationFormProps>({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, {setSubmitting}) => {
            submitHandler(values, setSubmitting);
            setSubmitting(true);
            setShowAlert(false);}
    });
    

    const statusOptions = useMemo(() => {
        const allowedStatuses = [
            APPLICATION_STATUS.PENDING_APPLICATION_LIST, 
            APPLICATION_STATUS.APPROVED
        ];

        return Object.values(APPLICATION_STATUS)
            .filter((status) => allowedStatuses.includes(status as typeof allowedStatuses[number]))
            .map((status) => ({
                label: status
                        .toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (char: string) => char.toUpperCase()),
                value: status,
            }));
    }, []);


    const submitHandler = async (values: ApplicationFormProps, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            let response: any = null;     
            response = await ApplicationAPI.updateApplicationStatus(initialData.studentId, values);
            if(response) {
                setError(false);
                setErrorMessage('');
                onSuccess(response);
            }
        } catch (error: any) {
            setError(true);
            setShowAlert(true);
            setErrorMessage(error?.message || "An error occurred while updating the application status.");
        } finally {
            setSubmitting(false);
            setShowAlert(true);
        }
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {showAlert &&
                    <div className="mt-5">
                        <Alert 
                            variant={isError ? 'error' : 'success'}
                            title={isError ? 'Error' : "Success!"}
                            message={isError ? errorMessage : "Application Updated Successfully!"}
                            showLink={false} 
                        />
                    </div>
                }

                <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                    <div className="w-full">
                        <Select 
                            id="appStatus"
                            name="appStatus"
                            label="Application Status" 
                            options={statusOptions} 
                            isMultiple={false} 
                            value={statusOptions.find(option => option.value === formik.values.appStatus)}
                            onChange={(option) => formik.setFieldValue("appStatus", option?.value)}
                            error={formik.touched.appStatus && formik.errors.appStatus ? true : false}
                            errorMessage={formik.errors.appStatus}
                        />
                    </div>
                </div>
                <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                    <div className="w-full">
                        <textarea
                            rows={6}
                            placeholder="Add your remarks here..."
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                            value={formik.values.remarks}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="remarks"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    {formik.isSubmitting ? 
                        <Throbber/>
                        :
                        <input
                            type="submit"
                            value={`Update Status`}
                            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                    } 
                </div>
            </form>
        </>
    )
}

export default ApplicationForm;