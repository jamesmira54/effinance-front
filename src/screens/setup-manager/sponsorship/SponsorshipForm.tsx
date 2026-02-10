import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SponsorshipFormProps } from "./Sponsorship.types";
import { useMemo, useState } from "react";
import { APISponsorhipPayload, APISponsorshipListResponse } from "@/types/sponsorship.types";
import { SponsorshipAPIService } from "@/api";
import Throbber from "@/components/common/Throbber";
import Alert from "@/components/Alert";

interface selectOptionsData {
    coordinators: SelectOption[];
    schools: SelectOption[];
    requirements: SelectOption[];
    academicYears: SelectOption[];
}

const SponsorshipForm: React.FC<
  {
    initialData:APISponsorshipListResponse, 
    selectOptionsData: selectOptionsData, 
    onSuccess: (updatedItem: any) => void;
  }> = ({
  initialData,
  selectOptionsData,
  onSuccess
}) => {


  const SponsorshipAPI = new SponsorshipAPIService();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  const initialValues = useMemo<SponsorshipFormProps>(() => ({
      name: initialData?.name || "",
      sponsorId: initialData?.sponsorId ? {
        label: selectOptionsData.coordinators.find((item) => item.value === initialData.sponsorId)?.label || "",
        value: initialData.sponsorId,
      } : null,
      academicYearId: initialData?.academicYearId ? {
        label: selectOptionsData.academicYears.find((item) => item.value === initialData.academicYearId)?.label || "",
        value: initialData.academicYearId,
      } : null,
      durationFrom: initialData?.durationFrom ? initialData.durationFrom.split('T')[0] : "",
      durationTo: initialData?.durationTo ? initialData.durationTo.split('T')[0] : "",
      batchNumber: initialData?.batchNumber || 0,
      limit: initialData?.limit || 0,
      slot: initialData?.slot || 0,
      fundAllocation: initialData?.fundAllocation || 0,
      sponsorshipRequirements: initialData?.sponsorshipRequirements?.map((item) => ({
        label: selectOptionsData.requirements.find((option) => option.value === item.id)?.label || "",
        value: item.id,
      })) || [],
      sponsorshipSchool: initialData?.sponsorshipSchool?.map((item) => ({
        label: selectOptionsData.schools.find((option) => option.value === item.schoolId)?.label || "",
        value: item.schoolId,
      })) || [],
    }), [initialData]);

  const formik = useFormik<SponsorshipFormProps>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field!"),
      sponsorId: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Required Field!"),
      academicYearId: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Required Field!"),
      durationFrom: Yup.string().required("Required Field!"),
      durationTo: Yup.string().required("Required Field!"),
      batchNumber: Yup.number().required("Required Field!"),
      limit: Yup.number().required("Required Field!"),
      slot: Yup.number().required("Required Field!"),
      fundAllocation: Yup.number().required("Required Field!"),
      sponsorshipRequirements: Yup.array()
        .min(1, "Select at least one school") // ✅ Require at least one selection
        .required("Required Field!"),
      sponsorshipSchool:Yup.array()
        .min(1, "Select at least one requirement") // ✅ Require at least one selection
        .required("Required Field!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      submitHandler(values, setSubmitting, resetForm);
      setSubmitting(true);
      setShowAlert(false);
    }
  });


  const submitHandler = async ( values: SponsorshipFormProps, setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void ) => {
    try {

      const payload: APISponsorhipPayload = {
        ...values,
        sponsorId: values.sponsorId?.value || "",
        academicYearId: values.academicYearId?.value || "",
        durationFrom: new Date(values.durationFrom).toISOString().split('T')[0],
        durationTo: new Date(values.durationTo).toISOString().split('T')[0],
        sponsorshipRequirements: values.sponsorshipRequirements?.map((item) => item.value) || [],
        sponsorshipSchool: values.sponsorshipSchool?.map((item) => item.value) || [],
      }

      let response: any = null;     

      if(initialData?.id) {
        response = await SponsorshipAPI.updateSponsorship(initialData.id, payload);
      } else {
        response = await SponsorshipAPI.createSponsorship(payload);
      }

      if(response) {
        setError(false);
        setErrorMessage('');
        setShowAlert(true);
        onSuccess(
          {
            ...response,
            sponsorshipRequirements: response.sponsorshipRequirements.map((item: any) => ({
              fileId: item.fileId,
              fileName: item.fileName,
            })),
            sponsorshipSchool: response.sponsorshipSchool.map((item: any) => ({
              schoolId: item.schoolId,
              schoolName: item.schoolName,
            })),
          } as APISponsorshipListResponse
        )
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
              id="name"
              label="Financial Assistance Name" 
              type="text" 
              placeholder="Financial Assistance Name" 
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.name && formik.errors.name ? true : false}
              errorMessage={formik.errors.name}
            />
          </div>
          <div className="w-full xl:w-1/2">
             <Select 
              id="sponsorId"
              name="sponsorId"
              label="Sponsor" 
              options={selectOptionsData.coordinators} 
              isMultiple={false} 
              value={formik.values.sponsorId}
              onChange={(option) => formik.setFieldValue("sponsorId", option)}
              error={formik.touched.sponsorId && formik.errors.sponsorId ? true : false}
              errorMessage={formik.errors.sponsorId}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
              id="academicYearId"
              name="academicYearId"
              label="Academic Year" 
              options={selectOptionsData.academicYears} 
              isMultiple={false} 
              value={formik.values.academicYearId}
              onChange={(option) => formik.setFieldValue("academicYearId", option)}
              error={formik.touched.academicYearId && formik.errors.academicYearId ? true : false}
              errorMessage={formik.errors.academicYearId}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input  
              id="batchNumber"
              label="Batch" 
              type="number" 
              placeholder="Batch" 
              name="batchNumber"
              value={formik.values.batchNumber}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.batchNumber && formik.errors.batchNumber ? true : false}
              errorMessage={formik.errors.batchNumber}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input 
              id="durationFrom"
              name="durationFrom"
              label="Duration From"
              type="date" 
              placeholder="Duration From"
              value={formik.values.durationFrom}
              onChange={e => {
                const raw = e.target.value             
                const iso = new Date(raw).toISOString() 
                formik.setFieldValue('durationFrom', iso)
              }}
              onBlur={() => formik.handleBlur}
              error={formik.touched.durationFrom && formik.errors.durationFrom ? true : false}
              errorMessage={formik.errors.durationFrom}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input 
              id="durationTo"
              name="durationTo"
              label="Duration To"
              type="date" 
              placeholder="Duration To"
              value={formik.values.durationTo}
              onChange={e => {
                const raw = e.target.value             
                const iso = new Date(raw).toISOString() 
                formik.setFieldValue('durationTo', iso)
              }}
              onBlur={() => formik.handleBlur}
              error={formik.touched.durationTo && formik.errors.durationTo ? true : false}
              errorMessage={formik.errors.durationTo}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input  
              id="limit"
              label="Limit" 
              type="number" 
              placeholder="Limit" 
              name="limit"
              value={formik.values.limit}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.limit && formik.errors.limit ? true : false}
              errorMessage={formik.errors.limit}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input  
              id="slot"
              label="Slot" 
              type="number" 
              placeholder="Slot" 
              name="slot"
              value={formik.values.slot}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.slot && formik.errors.slot ? true : false}
              errorMessage={formik.errors.slot}
            />
          </div>

        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
              id="sponsorshipSchool"
              name="sponsorshipSchool"
              label="Schools" 
              options={selectOptionsData.schools} 
              isMultiple={true} 
              value={formik.values.sponsorshipSchool}
              onChange={(option) => formik.setFieldValue("sponsorshipSchool", option)}
              error={formik.touched.sponsorshipSchool && formik.errors.sponsorshipSchool ? true : false}
              errorMessage={formik.errors.sponsorshipSchool}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Select 
              id="sponsorshipRequirements"
              name="sponsorshipRequirements"
              label="Requirements" 
              options={selectOptionsData.requirements} 
              isMultiple={true} 
              value={formik.values.sponsorshipRequirements}
              onChange={(option) => formik.setFieldValue("sponsorshipRequirements", option)}
              error={formik.touched.sponsorshipRequirements && formik.errors.sponsorshipRequirements ? true : false}
              errorMessage={formik.errors.sponsorshipRequirements}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input  
              id="fundAllocation"
              label="Fund Allocation" 
              type="number" 
              placeholder="Fund Allocation" 
              name="fundAllocation"
              value={formik.values.fundAllocation}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.fundAllocation && formik.errors.fundAllocation ? true : false}
              errorMessage={formik.errors.fundAllocation}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          {formik.isSubmitting ? 
              <Throbber/>
            :
            <input
              type="submit"
              value={`${initialData?.id ? "Update" : "Add"} Sponsorship`}
              className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          } 
        </div>

      </form>
    </>
  );
}

export default SponsorshipForm;