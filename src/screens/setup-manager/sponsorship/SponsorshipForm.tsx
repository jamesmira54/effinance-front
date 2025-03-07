import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SporsorshipFormProps } from "./Sponsorship.types";


const SponsorshipForm: React.FC = () => {


  const academicYearOptions: SelectOption[] = [
    { value: "1", label: "1st Semester" },
    { value: "2", label: "2nd Semester" }
  ];


  const schoolsOption: SelectOption[] = [
    { value: "1", label: "School 1" },
    { value: "2", label: "School 2" },
    { value: "3", label: "School 3" },
    { value: "4", label: "School 4" },
    { value: "5", label: "School 5" },
    { value: "6", label: "School 6" }
  ];


  const requirementsOption: SelectOption[] = [
    { value: "1", label: "Requirements 1" },
    { value: "2", label: "Requirements 2" },
    { value: "3", label: "Requirements 3" },
    { value: "4", label: "Requirements 4" },
    { value: "5", label: "Requirements 5" },
    { value: "6", label: "Requirements 6" }
  ];

  const formik = useFormik<SporsorshipFormProps>({
    initialValues: { 
      financialAssistanceName: "", 
      sponsor: "",
      academicYear: null,
      duration: "",
      batch: 0,
      slots: 0,
      limit: 0,
      fundAllocation: 0,
      schools: [],
      requirements: []
    },
    validationSchema: Yup.object({
      financialAssistanceName: Yup.string().required("Required Field!"),
      sponsor: Yup.string().required("Required Field!"),
      academicYear: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Required Field!"),
      duration: Yup.string().required("Required Field!"),
      batch: Yup.number().required("Required Field!"),
      slots: Yup.number().required("Required Field!"),
      limit: Yup.number().required("Required Field!"),
      fundAllocation: Yup.number().required("Required Field!"),
      schools: Yup.array()
        .min(1, "Select at least one school") // ✅ Require at least one selection
        .required("Required Field!"),
      requirements:Yup.array()
        .min(1, "Select at least one requirement") // ✅ Require at least one selection
        .required("Required Field!"),
    }),
    onSubmit: (values) => console.log(values),
  });

  return(
    <>  
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input  
              id="financialAssistanceName"
              label="Financial Assistance Name" 
              type="text" 
              placeholder="Financial Assistance Name" 
              name="financialAssistanceName"
              value={formik.values.financialAssistanceName}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.financialAssistanceName && formik.errors.financialAssistanceName ? true : false}
              errorMessage={formik.errors.financialAssistanceName}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input  
              id="sponsor"
              label="Sponsor" 
              type="text" 
              placeholder="Academic Year & Term" 
              name="sponsor"
              value={formik.values.sponsor}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.sponsor && formik.errors.sponsor ? true : false}
              errorMessage={formik.errors.sponsor}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
              id="academicYear"
              name="academicYear"
              label="Academic Year" 
              options={academicYearOptions} 
              isMultiple={false} 
              value={formik.values.academicYear}
              onChange={(option) => formik.setFieldValue("academicYear", option)}
              error={formik.touched.academicYear && formik.errors.academicYear ? true : false}
              errorMessage={formik.errors.academicYear}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input  
              id="duration"
              label="Duration" 
              type="date" 
              placeholder="Duration" 
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.duration && formik.errors.duration ? true : false}
              errorMessage={formik.errors.duration}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input  
              id="batch"
              label="Batch" 
              type="number" 
              placeholder="Batch" 
              name="batch"
              value={formik.values.batch}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.batch && formik.errors.batch ? true : false}
              errorMessage={formik.errors.batch}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Input  
              id="slots"
              label="Slots" 
              type="number" 
              placeholder="Slots" 
              name="slots"
              value={formik.values.slots}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.slots && formik.errors.slots ? true : false}
              errorMessage={formik.errors.slots}
            />
          </div>

        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input  
              id="limit"
              label="Lmit" 
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

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
              id="schools"
              name="schools"
              label="Schools" 
              options={schoolsOption} 
              isMultiple={true} 
              value={formik.values.schools}
              onChange={(option) => formik.setFieldValue("schools", option)}
              error={formik.touched.schools && formik.errors.schools ? true : false}
              errorMessage={formik.errors.schools}
            />
          </div>

          <div className="w-full xl:w-1/2">
            <Select 
              id="requirements"
              name="requirements"
              label="Requirements" 
              options={requirementsOption} 
              isMultiple={true} 
              value={formik.values.requirements}
              onChange={(option) => formik.setFieldValue("requirements", option)}
              error={formik.touched.requirements && formik.errors.requirements ? true : false}
              errorMessage={formik.errors.requirements}
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

export default SponsorshipForm;