import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption2 } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { AddressAPIService, AnnouncementsAPIService } from "@/api";
import Throbber from "@/components/common/Throbber";
import Alert from "@/components/Alert";
import { AnnouncementCreatePayload, AnnouncementDetailsProps } from "@/types";
import { useDropzone } from "react-dropzone";
import { CityMunProps, ProvinceProps } from "../setup-manager/school/School.types";

interface selectOptionsData {
    provinces: ProvinceProps[], 
    sponsorships: APISponsorshipListResponse[],
}

const AnnouncementsForm: React.FC<
    {
        initialData:AnnouncementDetailsProps, 
        serverData: selectOptionsData, 
        onSuccess: (updatedItem: AnnouncementDetailsProps, isNew: boolean) => void;
    }> = ({
    initialData,
    serverData,
    onSuccess
}) => {

    const AnnouncementsAPI = new AnnouncementsAPIService();
    const addressesAPI = new AddressAPIService();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [cityMunOptions, setCityMunOptions] = useState<SelectOption2[]>([]);

    const provinceData: SelectOption2[] = serverData.provinces.map((province) => ({
        label: province.provDesc,
        value: {
            id: province.id,
            provCode: province.provCode,
        }
    }));

    const sponsorshipOptions: SelectOption2[] = serverData.sponsorships.map((sponsorship) => ({
        label: sponsorship.name,
        value: sponsorship.id,
    }));

    const initialValues = useMemo<AnnouncementCreatePayload>(() => ({
        title: initialData?.title || "",
        caption: initialData?.caption || "",
        content: initialData?.content || "",
        sponsorshipId: initialData?.sponsorshipId || "",
        targetMunicipalitys: initialData?.locations?.map(mun => ({
            label: mun.name,
            value: mun.id,
        })) || [],
        files: [] as File[],
    }), [initialData]);

    const formik = useFormik<AnnouncementCreatePayload>({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            caption: Yup.string().required("Caption is required"),
            content: Yup.string().required("Content is required"),
            sponsorshipId: Yup.string().required("Sponsorship is required"),
            targetMunicipalitys: Yup.array().min(1, "At least one target municipality is required"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            submitHandler(values, setSubmitting, resetForm);
            setSubmitting(true);
            setShowAlert(false);
        }
    });


    const submitHandler = async ( values: AnnouncementCreatePayload, setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void ) => {
        try {

            const payload: AnnouncementCreatePayload = {
                ...values,
                targetMunicipalitys: (values.targetMunicipalitys ?? []).map((option: any) => option.value),
            };
            const formData = new FormData();
            formData.append("title", payload.title);
            formData.append("caption", payload.caption);
            formData.append("content", payload.content);
            formData.append("sponsorshipId", payload.sponsorshipId);
           
            payload.targetMunicipalitys?.forEach((item: any) => {
                formData.append("targetMunicipalitys[]", String(item));
            });

            payload.files.forEach((file: File) => {
                formData.append("files", file);
            });

            let response = null;
            let newRecord:boolean = true;

            if(initialData?.id) {
                newRecord = false;
                response = await AnnouncementsAPI.updateAnnouncement(initialData.id, formData);
            } else {
                response = await AnnouncementsAPI.createAnnouncement(formData);
            }

            if(response) {
                setError(false);
                setErrorMessage('');
                setShowAlert(true);
                onSuccess(response, newRecord);
            }

        }  catch (err: any) {
            setError(true);
            setShowAlert(true);
            setErrorMessage(err.response?.data?.errorDetails?.errors[0].msg || "An error occurred.");
        } finally {
            setSubmitting(false);
            setShowAlert(true);
        }
    }

    const onDrop = (acceptedFiles: File[]) => {
        formik.setFieldValue("files", [
            ...formik.values.files,
            ...acceptedFiles
        ]);

        const previewPromises = acceptedFiles.map((file) => {
            return new Promise<string>((resolve) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                } else {
                    resolve("");
                }
            });
        });

        Promise.all(previewPromises).then((newPreviews) => {
            setFilePreviews((prev) => [...prev, ...newPreviews]);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,
        onDrop,
        accept: {
        "image/*": [],
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
    });

    const handleProvinceChange = async (option: SelectOption2 | null) => {
        if (option) {
            const cityMunData = await addressesAPI.getAllCities(option.value.provCode);
    
            setCityMunOptions(cityMunData.map((city: CityMunProps) => ({
                label: city.citymunDesc,
                value: city.id
            })));
        }
    };


    return(
        <>  
        <form onSubmit={formik.handleSubmit}>
            {showAlert &&
                <div className="mt-5">
                    <Alert 
                    variant={isError ? 'error' : 'success'}
                    title={isError ? 'Error' : "Success!"}
                    message={isError ? errorMessage : "Sponsorship Added/Updated Successfully!"}
                    showLink={false} 
                    />
                </div>
            }
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <Input  
                        id="title"
                        label="Title" 
                        type="text" 
                        placeholder="Title" 
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={() => formik.handleBlur}
                        error={formik.touched.title && formik.errors.title ? true : false}
                        errorMessage={formik.errors.title}
                    />
                </div>
                <div className="w-full xl:w-1/2">
                    <Input  
                        id="caption"
                        label="Caption" 
                        type="text" 
                        placeholder="Caption" 
                        name="caption"
                        value={formik.values.caption}
                        onChange={formik.handleChange}
                        onBlur={() => formik.handleBlur}
                        error={formik.touched.caption && formik.errors.caption ? true : false}
                        errorMessage={formik.errors.caption}
                    />
                </div>
            </div>

            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-full">
                    <textarea
                        rows={10}
                        placeholder="Add announcement content here..."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="content"
                    ></textarea>
                </div>
            </div>

             <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-full">
                    <Select 
                        className="z-99"
                        id="sponsorshipId"
                        name="sponsorshipId"
                        label="Sponsorship" 
                        options={sponsorshipOptions} 
                        isMultiple={false} 
                        value={sponsorshipOptions.find(option => option.value === formik.values.sponsorshipId)}
                        onChange={(option) => formik.setFieldValue("sponsorshipId", option?.value)}
                        error={formik.touched.sponsorshipId && formik.errors.sponsorshipId ? true : false}
                        errorMessage={formik.errors.sponsorshipId}
                    />
                </div>
            </div>

            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full md:w-[48%] xl:w-1/2">
                    <Select 
                        className="z-99"
                        id="provinceId"
                        name="provinceId"
                        label="Province" 
                        options={provinceData} 
                        isMultiple={false} 
                        onChange={(option) => {
                            if (option) {
                                handleProvinceChange(option);
                            }
                        }}
                    />
                </div>
                <div className="w-full md:w-[48%] xl:w-1/2">
                    <Select 
                        id="targetMunicipalitys"
                        name="targetMunicipalitys"
                        label="Target Municipalitys" 
                        options={cityMunOptions} 
                        isMultiple={true} 
                        value={formik.values.targetMunicipalitys}
                        onChange={(option) => formik.setFieldValue("targetMunicipalitys", option)}
                        error={formik.touched.targetMunicipalitys && formik.errors.targetMunicipalitys ? true : false}
                        errorMessage={formik.errors.targetMunicipalitys}
                    />
                </div>

            </div>

            <div {...getRootProps()} className="border-2 border-dashed p-6 mt-4 text-center">
                <input {...getInputProps()} />
                <p>{isDragActive ? "Drop files here..." : "Drag & drop files or click"}</p>
            </div>

            <div className="mt-4 space-y-2">
                {formik.values.files.map((file: File, index: number) => (
                <div key={index} className="border p-2 rounded">
                    {filePreviews[index] ? (
                        <img src={filePreviews[index]} className="w-32 h-auto" />
                    ) : (
                        <p>{file.name}</p>
                    )}
                    <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                    </p>
                </div>
                ))}
            </div>


            <div className="flex justify-end mt-5">
                {formik.isSubmitting ? 
                    <Throbber/>
                    :
                    <input
                        type="submit"
                        value={`${initialData?.id ? "Update" : "Add"} Announcement`}
                        className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                } 
            </div>

        </form>
        </>
    );
}

export default AnnouncementsForm;