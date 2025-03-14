import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StudentProfileFormProps } from "./StudentProfile.types";


const StudentProfileForm: React.FC = () => {


  const sampleData: SelectOption[] = [
    { value: "1", label: "Data 1" },
    { value: "2", label: "Data 2" }
  ];


  const formik = useFormik<StudentProfileFormProps>({
    initialValues: { 
        age: undefined, 
        gender: null,
        birthdate: "",
        primaryAddress: "",
        secondaryAddress: "",
        school: null,
        schoolYear: undefined,
        fathersFName:"",
        fathersMName:"",
        fathersLName:"",
        fathersAge: undefined,
        fathersBirthdate: "",
        fathersOccupation: "",
        fathersIncome: "",
        fathersAddress: "",
        fathersPhone: "",
        mothersFName:"",
        mothersMName:"",
        mothersLName:"",
        mothersAge: undefined,
        mothersBirthdate: "",
        mothersOccupation: "",
        mothersIncome: "",
        mothersAddress: "",
        mothersPhone: "",
        numberOfSibling: undefined,
        siblings:""
    },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => console.log(values),
  });


  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="age"
                    label="Age" 
                    type="number" 
                    placeholder="Age" 
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.age && formik.errors.age ? true : false}
                    errorMessage={formik.errors.age}
                />
            </div>

            <div className="w-full xl:w-1/3">
                <Select 
                    className="z-999"
                    id="gender"
                    name="gender"
                    label="Gender" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.gender}
                    onChange={(option) => formik.setFieldValue("gender", option)}
                    error={formik.touched.gender && formik.errors.gender ? true : false}
                    errorMessage={formik.errors.gender}
                />
            </div>

            <div className="w-full xl:w-1/3">
                <Input 
                    id="birthdate"
                    label="Birthdate" 
                    type="date" 
                    placeholder="Birthdate" 
                    name="birthdate"
                    value={formik.values.birthdate}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.birthdate && formik.errors.birthdate ? true : false}
                    errorMessage={formik.errors.birthdate}
                />
            </div>
        </div>


        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
                <Input 
                    id="primaryAddress"
                    label="Primary Address" 
                    type="text" 
                    placeholder="Primary Address" 
                    name="primaryAddress"
                    value={formik.values.primaryAddress}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.primaryAddress && formik.errors.primaryAddress ? true : false}
                    errorMessage={formik.errors.primaryAddress}
                />
            </div>

            <div className="w-full xl:w-1/2">
                <Input 
                    id="secondaryAddress"
                    label="Secondary Address" 
                    type="text" 
                    placeholder="Secondary Address"
                    name="secondaryAddress"
                    value={formik.values.secondaryAddress}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.secondaryAddress && formik.errors.secondaryAddress ? true : false}
                    errorMessage={formik.errors.secondaryAddress}
                />
            </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
                <Select 
                    className="z-999"
                    id="school"
                    name="school"
                    label="School" 
                    options={sampleData} 
                    isMultiple={false} 
                    value={formik.values.school}
                    onChange={(option) => formik.setFieldValue("school", option)}
                    error={formik.touched.school && formik.errors.school ? true : false}
                    errorMessage={formik.errors.school}
                />
            </div>

            <div className="w-full xl:w-1/2">
                <Input 
                    id="schoolYear"
                    label="School Year" 
                    type="number" 
                    placeholder="School Year" 
                    name="schoolYear"
                    value={formik.values.schoolYear}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.schoolYear && formik.errors.schoolYear ? true : false}
                    errorMessage={formik.errors.schoolYear}
                />
            </div>
        </div>

        <h3 className="text-lg mb-2">Father's Information:</h3>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersFName"
                    label="First Name"
                    type="text" 
                    placeholder="First Name"
                    name="fathersFName"
                    value={formik.values.fathersFName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersFName && formik.errors.fathersFName ? true : false}
                    errorMessage={formik.errors.fathersFName}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersMName"
                    label="Middle Name"
                    type="text" 
                    placeholder="Middle Name"
                    name="fathersMName"
                    value={formik.values.fathersMName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersMName && formik.errors.fathersMName ? true : false}
                    errorMessage={formik.errors.fathersMName}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersLName"
                    label="Last Name"
                    type="text" 
                    placeholder="Last Name"
                    name="fathersLName"
                    value={formik.values.fathersLName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersLName && formik.errors.fathersLName ? true : false}
                    errorMessage={formik.errors.fathersLName}
                />
            </div>
        </div>


        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersAge"
                    label="Age"
                    type="number" 
                    placeholder="Age"
                    name="fathersAge"
                    value={formik.values.fathersAge}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersAge && formik.errors.fathersAge ? true : false}
                    errorMessage={formik.errors.fathersAge}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersBirthdate"
                    label="Birthdate"
                    type="date" 
                    placeholder="Birthdate"
                    name="fathersBirthdate"
                    value={formik.values.fathersBirthdate}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersBirthdate && formik.errors.fathersBirthdate ? true : false}
                    errorMessage={formik.errors.fathersBirthdate}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersOccupation"
                    label="Occupation"
                    type="text" 
                    placeholder="Occupation"
                    name="fathersOccupation"
                    value={formik.values.fathersOccupation}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersOccupation && formik.errors.fathersOccupation ? true : false}
                    errorMessage={formik.errors.fathersOccupation}
                />
            </div>
        </div>


        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersIncome"
                    label="Income"
                    type="text" 
                    placeholder="Income"
                    name="fathersIncome"
                    value={formik.values.fathersIncome}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersIncome && formik.errors.fathersIncome ? true : false}
                    errorMessage={formik.errors.fathersIncome}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersAddress"
                    label="Address"
                    type="text" 
                    placeholder="Address"
                    name="fathersAddress"
                    value={formik.values.fathersAddress}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersAddress && formik.errors.fathersAddress ? true : false}
                    errorMessage={formik.errors.fathersAddress}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="fathersPhone"
                    label="Phone "
                    type="text" 
                    placeholder="Phone #"
                    name="fathersPhone"
                    value={formik.values.fathersPhone}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.fathersPhone && formik.errors.fathersPhone ? true : false}
                    errorMessage={formik.errors.fathersPhone}
                />
            </div>
        </div>


        <h3 className="text-lg mb-2">Mother's Information:</h3>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersFName"
                    label="First Name"
                    type="text" 
                    placeholder="First Name"
                    name="mothersFName"
                    value={formik.values.mothersFName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersFName && formik.errors.mothersFName ? true : false}
                    errorMessage={formik.errors.mothersFName}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersMName"
                    label="Middle Name"
                    type="text" 
                    placeholder="Middle Name"
                    name="mothersMName"
                    value={formik.values.mothersMName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersMName && formik.errors.mothersMName ? true : false}
                    errorMessage={formik.errors.mothersMName}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersLName"
                    label="Last Name"
                    type="text" 
                    placeholder="Last Name"
                    name="mothersLName"
                    value={formik.values.mothersLName}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersLName && formik.errors.mothersLName ? true : false}
                    errorMessage={formik.errors.mothersLName}
                />
            </div>
        </div>

        <h3 className="text-lg mb-2">Others:</h3>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row"> 
            <div className="w-full xl:w-1/2">
                <Input 
                    id="numberOfSibling"
                    label="Number Of Sibling"
                    type="number" 
                    placeholder="Number Of Sibling"
                    name="numberOfSibling"
                    value={formik.values.numberOfSibling}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.numberOfSibling && formik.errors.numberOfSibling ? true : false}
                    errorMessage={formik.errors.numberOfSibling}
                />
            </div>
            <div className="w-full xl:w-1/2">
                <Input 
                    id="siblings"
                    label="Number Of Sibling"
                    type="text" 
                    placeholder="Number Of Sibling"
                    name="siblings"
                    value={formik.values.siblings}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.siblings && formik.errors.siblings ? true : false}
                    errorMessage={formik.errors.siblings}
                />
            </div>
        </div>


        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersAge"
                    label="Age"
                    type="number" 
                    placeholder="Age"
                    name="mothersAge"
                    value={formik.values.mothersAge}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersAge && formik.errors.mothersAge ? true : false}
                    errorMessage={formik.errors.mothersAge}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersBirthdate"
                    label="Birthdate"
                    type="date" 
                    placeholder="Birthdate"
                    name="mothersBirthdate"
                    value={formik.values.mothersBirthdate}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersBirthdate && formik.errors.mothersBirthdate ? true : false}
                    errorMessage={formik.errors.mothersBirthdate}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersOccupation"
                    label="Occupation"
                    type="text" 
                    placeholder="Occupation"
                    name="mothersOccupation"
                    value={formik.values.mothersOccupation}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersOccupation && formik.errors.mothersOccupation ? true : false}
                    errorMessage={formik.errors.mothersOccupation}
                />
            </div>
        </div>


        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersIncome"
                    label="Income"
                    type="text" 
                    placeholder="Income"
                    name="mothersIncome"
                    value={formik.values.mothersIncome}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersIncome && formik.errors.mothersIncome ? true : false}
                    errorMessage={formik.errors.mothersIncome}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersAddress"
                    label="Address"
                    type="text" 
                    placeholder="Address"
                    name="mothersAddress"
                    value={formik.values.mothersAddress}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersAddress && formik.errors.mothersAddress ? true : false}
                    errorMessage={formik.errors.mothersAddress}
                />
            </div>
            <div className="w-full xl:w-1/3">
                <Input 
                    id="mothersPhone"
                    label="Phone "
                    type="text" 
                    placeholder="Phone #"
                    name="mothersPhone"
                    value={formik.values.mothersPhone}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mothersPhone && formik.errors.mothersPhone ? true : false}
                    errorMessage={formik.errors.mothersPhone}
                />
            </div>
        </div>
        

        <div className="flex justify-end mt-5">
          <input
            type="submit"
            value="Save"
            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </>
  );
}

export default StudentProfileForm;