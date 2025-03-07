import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AcademicSetupFormProps } from "./AcademicSetup.types";


const AcademicSetupForm: React.FC = () => {


  const schoolTermOptions: SelectOption[] = [
    { value: "1", label: "1st Semester" },
    { value: "2", label: "2nd Semester" }
  ];

  const statusOptions: SelectOption[] = [
    { value: "1", label: "Active" },
    { value: "0", label: "Lock" }
  ];

  const formik = useFormik<AcademicSetupFormProps>({
    initialValues: { 
      academicYear: "", 
      schoolTerm: schoolTermOptions[0],
      dateCovered: new Date().toISOString().split("T")[0],
      status: statusOptions[0],
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      academicYear: Yup.string().required("Required Field!"),
      schoolTerm: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Required Field!"),
      dateCovered: Yup.string().required("Required Field!"),
      status: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Required Field!"),
    }),
    onSubmit: (values) => console.log(values),
  });


  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4">
          <Input 
            id="academicYear"
            label="Academic Year & Term" 
            type="text" 
            placeholder="Academic Year & Term" 
            name="academicYear"
            value={formik.values.academicYear}
            onChange={formik.handleChange}
            onBlur={() => formik.handleBlur}
            error={formik.touched.academicYear && formik.errors.academicYear ? true : false}
            errorMessage={formik.errors.academicYear}
          />
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

        <div className="flex flex-col mb-4">
          <Input 
            id="dateCovered"
            name="dateCovered"
            label="Date Covered"
            type="date" 
            placeholder="Date Covered"
            value={formik.values.dateCovered}
            onChange={formik.handleChange}
            onBlur={() => formik.handleBlur}
            error={formik.touched.dateCovered && formik.errors.dateCovered ? true : false}
            errorMessage={formik.errors.dateCovered}
          />
        </div>

        <div className="flex flex-col mb-4">
          <Select 
            id="status"
            name="status"
            label="Status" 
            options={statusOptions} 
            isMultiple={false} 
            value={formik.values.status}
            onChange={(option) => formik.setFieldValue("status", option)}
            error={formik.touched.status && formik.errors.status ? true : false}
            errorMessage={formik.errors.status}
          />
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

export default AcademicSetupForm;