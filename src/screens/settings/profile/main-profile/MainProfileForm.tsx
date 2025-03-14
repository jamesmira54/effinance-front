import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainProfileFormProps } from "./MainProfile.types";


const MainProfileForm: React.FC = () => {


  const sampleData: SelectOption[] = [
    { value: "1", label: "Data 1" },
    { value: "2", label: "Data 2" }
  ];


  const formik = useFormik<MainProfileFormProps>({
    initialValues: { 
        firstName: "", 
        lastName: "",
        middleName: "",
        emailAddress: "",
        phone: ""
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
        firstName: Yup.string().required("Required Field!"),
        lastName: Yup.string().required("Required Field!"),
        emailAddress: Yup.string().email("Invalid email format").required("Required Field!"),
    }),
    onSubmit: (values) => console.log(values),
  });


  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4 gap-3 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <Input 
                id="firstName"
                label="First Name" 
                type="text" 
                placeholder="First Name" 
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName ? true : false}
                errorMessage={formik.errors.firstName}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <Input 
                id="middleName"
                label="Middle Name" 
                type="text" 
                placeholder="Middle Name" 
                name="middleName"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.middleName && formik.errors.middleName ? true : false}
                errorMessage={formik.errors.middleName}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <Input 
                id="lastName"
                label="Last Name" 
                type="text" 
                placeholder="Last Name" 
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName ? true : false}
                errorMessage={formik.errors.lastName}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input 
              id="emailAddress"
              label="Email Address" 
              type="email" 
              placeholder="Email Address" 
              name="emailAddress"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.emailAddress && formik.errors.emailAddress ? true : false}
              errorMessage={formik.errors.emailAddress}
              />
          </div>
          <div className="w-full xl:w-1/2">
            <Input 
              id="phone"
              label="Phone" 
              type="text" 
              placeholder="Phone" 
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.phone && formik.errors.phone ? true : false}
              errorMessage={formik.errors.phone}
              />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
              className="z-999"
              id="role"
              name="role"
              label="Role" 
              options={sampleData} 
              isMultiple={false} 
              value={formik.values.role}
              onChange={(option) => formik.setFieldValue("role", option)}
              error={formik.touched.role && formik.errors.role ? true : false}
              errorMessage={formik.errors.role}
            />
          </div>
        </div>

        <h3 className="text-md mt-6 mb-2">Social Media Links:</h3>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input 
                  id="facebookUrl"
                  label="Facebook" 
                  type="text" 
                  placeholder="Facebook" 
                  name="facebookUrl"
                  value={formik.values.facebookUrl}
                  onChange={formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  error={formik.touched.facebookUrl && formik.errors.facebookUrl ? true : false}
                  errorMessage={formik.errors.facebookUrl}
                />
            </div>
            <div className="w-full xl:w-1/2">
              <Input 
                  id="instagramUrl"
                  label="Instagram" 
                  type="text" 
                  placeholder="Instagram" 
                  name="instagramUrl"
                  value={formik.values.instagramUrl}
                  onChange={formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  error={formik.touched.instagramUrl && formik.errors.instagramUrl ? true : false}
                  errorMessage={formik.errors.instagramUrl}
                />
            </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input 
                  id="linkedInUrl"
                  label="LinkedIn" 
                  type="text" 
                  placeholder="LinkedIn" 
                  name="linkedInUrl"
                  value={formik.values.linkedInUrl}
                  onChange={formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  error={formik.touched.linkedInUrl && formik.errors.linkedInUrl ? true : false}
                  errorMessage={formik.errors.linkedInUrl}
                />
            </div>
            <div className="w-full xl:w-1/2">
              <Input 
                  id="twitterUrl"
                  label="X.com" 
                  type="text" 
                  placeholder="X.com" 
                  name="twitterUrl"
                  value={formik.values.twitterUrl}
                  onChange={formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  error={formik.touched.twitterUrl && formik.errors.twitterUrl ? true : false}
                  errorMessage={formik.errors.twitterUrl}
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

export default MainProfileForm;