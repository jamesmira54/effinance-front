import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SchoolFormProps } from "./School.types";


const SchoolForm: React.FC = () => {


  const sampleData: SelectOption[] = [
    { value: "1", label: "Data 1" },
    { value: "2", label: "Data 2" }
  ];


  const formik = useFormik<SchoolFormProps>({
    initialValues: { 
        province: null, 
        city: null,
        municipality: null,
        barangay: null,
        schoolName: "",
        schoolType: null
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
        province: Yup.object() .shape({ value: Yup.string().required(), label: Yup.string().required(), }) .required("Required Field!"),
        city: Yup.object() .shape({ value: Yup.string().required(), label: Yup.string().required(), }) .required("Required Field!"),
        municipality: Yup.object() .shape({ value: Yup.string().required(), label: Yup.string().required(), }) .required("Required Field!"),
        barangay: Yup.object() .shape({ value: Yup.string().required(), label: Yup.string().required(), }) .required("Required Field!"),
        schoolName: Yup.string().required("Required Field!"),
        schoolType: Yup.object() .shape({ value: Yup.string().required(), label: Yup.string().required(), }) .required("Required Field!"),
    }),
    onSubmit: (values) => console.log(values),
  });


  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
                <Select 
                    className="z-99"
                    id="province"
                    name="province"
                    label="Province" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.province}
                    onChange={(option) => formik.setFieldValue("province", option)}
                    error={formik.touched.province && formik.errors.province ? true : false}
                    errorMessage={formik.errors.province}
                    
                />
            </div>
            <div className="w-full xl:w-1/2">
                <Select 
                    className="z-999"
                    id="city"
                    name="city"
                    label="City" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.city}
                    onChange={(option) => formik.setFieldValue("city", option)}
                    error={formik.touched.city && formik.errors.city ? true : false}
                    errorMessage={formik.errors.city}
                />
            </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
                <Select 
                    id="municipality"
                    name="municipality"
                    label="Municipality" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.municipality}
                    onChange={(option) => formik.setFieldValue("municipality", option)}
                    error={formik.touched.municipality && formik.errors.municipality ? true : false}
                    errorMessage={formik.errors.municipality}
                />
            </div>
            <div className="w-full xl:w-1/2">
                <Select 
                    className="z-99"
                    id="barangay"
                    name="barangay"
                    label="Barangay" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.barangay}
                    onChange={(option) => formik.setFieldValue("barangay", option)}
                    error={formik.touched.barangay && formik.errors.barangay ? true : false}
                    errorMessage={formik.errors.barangay}
                />
            </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
                <Input 
                    id="schoolName"
                    label="School Name" 
                    type="text" 
                    placeholder="School Name" 
                    name="schoolName"
                    value={formik.values.schoolName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.schoolName && formik.errors.schoolName ? true : false}
                    errorMessage={formik.errors.schoolName}
                />
            </div>
            <div className="w-full xl:w-1/2">
                <Select 
                    id="schoolType"
                    name="schoolType"
                    label="School Type" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.schoolType}
                    onChange={(option) => formik.setFieldValue("schoolType", option)}
                    error={formik.touched.schoolType && formik.errors.schoolType ? true : false}
                    errorMessage={formik.errors.schoolType}
                />
            </div>
        </div>


        <div className="flex justify-end mt-5">
          <input
            type="submit"
            value="Submit"
            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </>
  );
}

export default SchoolForm;