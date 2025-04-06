import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainProfileFormProps } from "./MainProfile.types";
import { APIUserRoles, MainProfileFormPayload } from "@/types";
import { UserAPIService } from "@/api";
import { useState } from "react";
import Throbber from "@/components/common/Throbber";
import Alert from "@/components/Alert";


const MainProfileForm: React.FC<{userDetails: MainProfileFormProps, roles: APIUserRoles[]}> = ({
  userDetails,
  roles
}) => {

  const userAPI = new UserAPIService();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const rolesData: SelectOption[] = roles.map((item) => ({
    label: item.name,
    value: item.id,
  }));


  const formik = useFormik<MainProfileFormProps>({
    initialValues: { 
        userId: userDetails.userId,
        username: userDetails.username,
        firstName: userDetails.firstName, 
        lastName: userDetails.lastName,
        middleName: userDetails.middleName,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        roleId: userDetails.roleId,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Required Field!"),
      firstName: Yup.string().required("Required Field!"),
      lastName: Yup.string().required("Required Field!"),
      email: Yup.string().email("Invalid email format").required("Required Field!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      submitHandler(values, setSubmitting);
      setSubmitting(true);
      setShowAlert(false);
    }
  });

  const submitHandler = async (values: MainProfileFormProps, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const payload:MainProfileFormPayload = {
        ...values,
        roleId: values.roleId?.value || ''
      }
      const response = await userAPI.updateProfile(values.userId, payload);
      if(response){
        setError(false);
        setErrorMessage('');
        
      }
    } catch (err: any) {
      setError(true);
      setShowAlert(true);
      setErrorMessage(err.response?.data?.errorDetails?.errors[0].msg || "An error occurred while updating the profile.");
    } finally {
      setSubmitting(false);
      setShowAlert(true);
    }
  }


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
          <div className="w-full xl:w-1/3">
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
          <div className="w-full xl:w-1/3">
            <Input 
              id="email"
              label="Email Address" 
              type="email" 
              placeholder="Email Address" 
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.email && formik.errors.email ? true : false}
              errorMessage={formik.errors.email}
              />
          </div>
          <div className="w-full xl:w-1/3">
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
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
              className="z-999"
              id="roleId"
              name="roleId"
              label="Role" 
              options={rolesData} 
              isMultiple={false} 
              value={formik.values.roleId}
              onChange={(option) => formik.setFieldValue("roleId", option)}
              error={formik.touched.roleId && formik.errors.roleId ? true : false}
              errorMessage={formik.errors.roleId}
            />
          </div>
        </div>

        {/* <h3 className="text-md mt-6 mb-2">Social Media Links:</h3>
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
        </div> */}

        <div className="flex justify-end mt-5">
          {formik.isSubmitting ? 
              <Throbber/>
            :
            <input
              type="submit"
              value="Save"
              className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          } 
        </div>
        {showAlert &&
          <div className="mt-5">
            <Alert 
              variant={isError ? 'error' : 'success'}
              title={isError ? 'Error' : "Success!"}
              message={isError ? errorMessage : "Profile updated successfully!"}
              showLink={false} 
            />
          </div>
        }
      </form>
    </>
  );
}

export default MainProfileForm;