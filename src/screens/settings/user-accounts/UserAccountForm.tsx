import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserAccountListingFormProps } from "./UserAccountListing.types";
import { APINewUserPayload, APIUserRoles } from "@/types";
import { AuthAPIService } from "@/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Throbber from "@/components/common/Throbber";
import Alert from "@/components/Alert";
import Button from "@/components/Button";


const UserAccountForm: React.FC<{onClose: () => void, roles: APIUserRoles[]}> = ({
  onClose,
  roles
}) => {

  const authAPI = new AuthAPIService();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const router = useRouter();
  const [isSuccess, setSuccess ] = useState<boolean>(false);
  

  const roleOptions: SelectOption[] = roles.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const formik = useFormik<UserAccountListingFormProps>({
    initialValues: { 
      firstName: "", 
      lastName: "",
      username: "",
      email: "",
      mobileNumber: "",
      password: "",
      repassword: "",
      roleId: null,
    },
    validationSchema: Yup.object({
        firstName: Yup.string().required("Required Field!"),
        lastName: Yup.string().required("Required Field!"),
        username: Yup.string().required("Required Field!"),
        email: Yup.string().email("Invalid email format").required("Required Field!"),
        roleId: Yup.object()
          .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
          })
          .required("Required Field!"),
        password: Yup.string().required("Required Field!"),
        repassword: Yup.string().required("Required Field!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      submitHandler(values, setSubmitting);
      setSubmitting(true);
      setShowAlert(false);
    }
  });


  const submitHandler = async (values: UserAccountListingFormProps, setSubmitting: (isSubmitting: boolean) => void) => {
    try {

      const payload:APINewUserPayload = {
        ...values,
        roleId: values.roleId?.value || ''
      }

      const response = await authAPI.signUp(payload);
      if(response){
        setError(false);
        setErrorMessage('');
        setSuccess(true);
        router.refresh();
      }

    } catch (err: any) {
      setError(true);
      setShowAlert(true);
      setErrorMessage(err.response?.data?.errorDetails?.errors[0].msg || "An error occurred.");
    }finally {
      setSubmitting(false);
      setShowAlert(true);
    }
  }

  return(
    <>  
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
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
          <div className="w-full xl:w-1/2">
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
              id="username"
              label="Username" 
              type="text" 
              placeholder="Username" 
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.username && formik.errors.username ? true : false}
              errorMessage={formik.errors.username}
            />
          </div>
          <div className="w-full xl:w-1/2">
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
        </div>

        <div className="flex flex-col mb-4">
          <Input  
            id="mobileNumber"
            label="Mobile Number" 
            type="text" 
            placeholder="Mobile Number" 
            name="mobileNumber"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={() => formik.handleBlur}
            error={formik.touched.mobileNumber && formik.errors.mobileNumber ? true : false}
            errorMessage={formik.errors.mobileNumber}
          />
        </div>

        <div className="flex flex-col mb-4">
          <Select 
              id="roleId"
              name="roleId"
              label="Role" 
              options={roleOptions} 
              isMultiple={false} 
              value={formik.values.roleId}
              onChange={(option) => formik.setFieldValue("roleId", option)}
              error={formik.touched.roleId && formik.errors.roleId ? true : false}
              errorMessage={formik.errors.roleId}
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
            id="repassword"
            label="Confirm Password" 
            type="password" 
            placeholder="Confirm Password" 
            name="repassword"
            value={formik.values.repassword}
            onChange={formik.handleChange}
            onBlur={() => formik.handleBlur}
            error={formik.touched.repassword && formik.errors.repassword ? true : false}
            errorMessage={formik.errors.repassword}
          />
        </div>

        <div className="flex justify-end mt-5">
          {formik.isSubmitting ? 
              <Throbber/>
            :
            !isSuccess ?
              <input
                type="submit"
                value="Register"
                className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            :
              <Button onClick={onClose} variants="outlined">Close</Button>
          } 
        </div>

        {showAlert &&
          <div className="mt-5">
            <Alert 
              variant={isError ? 'error' : 'success'}
              title={isError ? 'Error' : "Success!"}
              message={isError ? errorMessage : "User Created Successfully!"}
              showLink={false} 
            />
          </div>
        }
      </form>
    </>
  );
}

export default UserAccountForm;