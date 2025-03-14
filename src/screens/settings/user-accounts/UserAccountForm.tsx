import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserAccountListingFormProps } from "./UserAccountListing.types";


const UserAccountForm: React.FC = () => {

  const roleOptions: SelectOption[] = [
    { value: "1", label: "Role 1" },
    { value: "2", label: "Role 2" },
    { value: "3", label: "Role 3" },
    { value: "4", label: "Role 4" }
  ];

  const formik = useFormik<UserAccountListingFormProps>({
    initialValues: { 
        firstname: "", 
        middlename: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: null,
    },
    validationSchema: Yup.object({
        firstname: Yup.string().required("Required Field!"),
        lastname: Yup.string().required("Required Field!"),
        email: Yup.string().email("Invalid email format").required("Required Field!"),
        password: Yup.string().required("Required Field!"),
        confirmPassword: Yup.string().required("Required Field!"),
        role: Yup.object()
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
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <Input  
                id="firstname"
                label="First Name" 
                type="text" 
                placeholder="First Name" 
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.firstname && formik.errors.firstname ? true : false}
                errorMessage={formik.errors.firstname}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <Input  
                id="middlename"
                label="Middle Name" 
                type="text" 
                placeholder="Middle Name" 
                name="middlename"
                value={formik.values.middlename}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.middlename && formik.errors.middlename ? true : false}
                errorMessage={formik.errors.middlename}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <Input  
                id="lastname"
                label="Last Name" 
                type="text" 
                placeholder="Last Name" 
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.lastname && formik.errors.lastname ? true : false}
                errorMessage={formik.errors.lastname}
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <Input  
              id="email"
              label="Email" 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.email && formik.errors.email ? true : false}
              errorMessage={formik.errors.email}
          />
        </div>
        <div className="flex flex-col mb-4">
          <Input  
            id="phoneNumber"
            label="Phone Number" 
            type="text" 
            placeholder="Phone Number" 
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={() => formik.handleBlur}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
            errorMessage={formik.errors.phoneNumber}
          />
        </div>
        <div className="flex flex-col mb-4">
          <Select 
              id="role"
              name="role"
              label="Role" 
              options={roleOptions} 
              isMultiple={false} 
              value={formik.values.role}
              onChange={(option) => formik.setFieldValue("role", option)}
              error={formik.touched.role && formik.errors.role ? true : false}
              errorMessage={formik.errors.role}
          />
        </div>

        <div className="flex flex-col mb-4">
          <Input  
              id="password"
              label="Password" 
              type="password" 
              placeholder="Password" 
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.password && formik.errors.password ? true : false}
              errorMessage={formik.errors.password}
          />
        </div>
        <div className="flex flex-col mb-4">
          <Input  
            id="confirmPassword"
            label="Confirm Password" 
            type="password" 
            placeholder="Confirm Password" 
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={() => formik.handleBlur}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
            errorMessage={formik.errors.confirmPassword}
          />
        </div>

        <div className="flex justify-end mt-5">
          <input
            type="submit"
            value="Register"
            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </>
  );
}

export default UserAccountForm;