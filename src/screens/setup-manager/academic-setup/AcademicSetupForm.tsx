import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AcademicSetupFormProps } from "./AcademicSetup.types";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { APIAcademicPayload, APIAcademicYearProps } from "@/types";
import { AcademicAPIService } from "@/api";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";


const AcademicSetupForm: React.FC<{initialData?: APIAcademicYearProps, onSuccess: (updatedItem: APIAcademicYearProps) => void;}> = ({
  initialData,
  onSuccess
}) => {

  const AcademicAPI = new AcademicAPIService();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);


  const schoolTermOptions: SelectOption[] = [
    { value: "1", label: "1st Semester" },
    { value: "2", label: "2nd Semester" }
  ];

  const getInitialSchoolTerm = (value?: number | string) => {
    const termValue = typeof value === "number" ? value.toString() : value;
    return schoolTermOptions.find((opt) => opt.value === termValue) || schoolTermOptions[0];
  };


  const initialValues = useMemo<AcademicSetupFormProps>(() => ({
    academicYearStart: initialData?.academicYearStart ?? new Date().getFullYear(),
    academicYearEnd: initialData?.academicYearEnd ?? new Date().getFullYear(),
    schoolTerm: getInitialSchoolTerm(initialData?.schoolTerm),
    dateFrom: initialData?.dateFrom?.split('T')[0] ?? new Date().toISOString().split('T')[0],
    dateTo: initialData?.dateTo?.split('T')[0] ?? new Date().toISOString().split('T')[0],
  }), [initialData]);

  const formik = useFormik<AcademicSetupFormProps>({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      academicYearStart: Yup.string().required("Required Field!"),
      academicYearEnd: Yup.string().required("Required Field!"),
      schoolTerm: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Required Field!"),
      dateFrom: Yup.string().required("Required Field!"),
      dateTo: Yup.string().required("Required Field!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      submitHandler(values, setSubmitting, resetForm);
      setSubmitting(true);
      setShowAlert(false);
    }
  });


  const submitHandler = async ( values: AcademicSetupFormProps, setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void ) => {
    
    try {

      const payload:APIAcademicPayload = {
        ...values,
        schoolTerm: parseInt(values.schoolTerm?.value ?? "0"),
        dateFrom: new Date(values.dateFrom).toISOString(),
        dateTo: new Date(values.dateTo).toISOString(),
      }
    
      let response: any = null;
      
      if(initialData?.id) {
        response = await AcademicAPI.updateAcademicYear(initialData?.id, payload);
      }else {
        response = await AcademicAPI.addAcademicYear(payload);
      }

      
      if (response) {
        setError(false);
        setErrorMessage('');
        resetForm();
        onSuccess({ ...payload, id: initialData?.id || response?.id });
      }
    } catch (err: any) {
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
        <div className="flex flex-col mb-4 gap-3 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input 
              id="academicYearStart"
              label="Year Start" 
              type="number" 
              placeholder="Year Start" 
              name="academicYearStart"
              value={formik.values.academicYearStart}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.academicYearStart && formik.errors.academicYearStart ? true : false}
              errorMessage={formik.errors.academicYearStart}
            />
          </div>
          <div className="w-full xl:w-1/2">
          <Input 
              id="academicYearEnd"
              label="Year End" 
              type="number" 
              placeholder="Year End" 
              name="academicYearEnd"
              value={formik.values.academicYearEnd}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.academicYearEnd && formik.errors.academicYearEnd ? true : false}
              errorMessage={formik.errors.academicYearEnd}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <Select 
            id="schoolTerm"
            name="schoolTerm"
            label="School Term" 
            options={schoolTermOptions} 
            isMultiple={false} 
            value={formik.values.schoolTerm}
            onChange={(option) => formik.setFieldValue("schoolTerm", option)}
            error={formik.touched.schoolTerm && formik.errors.schoolTerm ? true : false}
            errorMessage={formik.errors.schoolTerm}
          />
        </div>

        <div className="flex flex-col mb-4 gap-3 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input 
              id="dateFrom"
              name="dateFrom"
              label="Date From"
              type="date" 
              placeholder="Date From"
              value={formik.values.dateFrom}
              onChange={e => {
                const raw = e.target.value             
                const iso = new Date(raw).toISOString() 
                formik.setFieldValue('dateFrom', iso)
              }}
              onBlur={() => formik.handleBlur}
              error={formik.touched.dateFrom && formik.errors.dateFrom ? true : false}
              errorMessage={formik.errors.dateFrom}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input 
              id="dateTo"
              name="dateTo"
              label="Date To"
              type="date" 
              placeholder="Date To"
              value={formik.values.dateTo}
              onChange={e => {
                const raw = e.target.value             
                const iso = new Date(raw).toISOString() 
                formik.setFieldValue('dateTo', iso)
              }}
              onBlur={() => formik.handleBlur}
              error={formik.touched.dateTo && formik.errors.dateTo ? true : false}
              errorMessage={formik.errors.dateTo}
            />
          </div>
        </div>


        <div className="flex justify-end mt-5">
          {formik.isSubmitting ? 
              <Throbber/>
            :
            <input
              type="submit"
             value={initialData?.id ? 'Update Academic' : 'Add Academic'}
              className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          } 
        </div>

        {showAlert &&
          <div className="mt-5">
            <Alert 
              variant={isError ? 'error' : 'success'}
              title={isError ? 'Error' : "Success!"}
              message={isError ? errorMessage : "Academic Added/Updated Successfully!"}
              showLink={false} 
            />
          </div>
        }
      </form>
    </>
  );
}

export default AcademicSetupForm;