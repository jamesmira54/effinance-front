"use client";
import Input from "@/components/Inputs/Input";
import Link from "next/link";
import Image from "next/image";
import { CiLock, CiMail, CiPhone, CiUser } from "react-icons/ci";
import { useFormik } from "formik";
import { SignUpFormProps } from "./Auth.types";
import * as Yup from "yup";
import { useState } from "react";
import Throbber from "@/components/common/Throbber";
import { useRouter } from "next/navigation";
import { AuthAPIService } from "@/api";


const SignUp: React.FC = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const authAPI = new AuthAPIService();

  const SignUpHandler = async(values: SignUpFormProps, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      setSubmitting(true);
      await authAPI.signUp(values);
      router.push("/dashboard");
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.response?.data.errorDetails || "Something went wrong, please try again later.")
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  const formik = useFormik<SignUpFormProps>({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      mobileNumber: "",
      password: "",
      repassword: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("This field is required"),
      lastName: Yup.string().required("This field is required"),
      username: Yup.string().required("This field is required"),
      email: Yup.string().email("Invalid email format").required("This field is required"),
      mobileNumber: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
      repassword: Yup.string().required("This field is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      SignUpHandler(values, setSubmitting);
      setLoading(true);
    }
  });

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="h-full flex flex-wrap items-center justify-center">
        <div className="w-full max-w-[760px] border-stroke dark:border-strokedark xl:w-1/2 xl:border-r xl:border-l">
          <div className="w-full p-4 sm:p-12.5 xl:p-10.5">
            <div className="text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
            </div>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
              Sign Up to Efinas
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      endIcon={<CiUser size={22}/>}
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      error={formik.touched.firstName && formik.errors.firstName ? true : false}
                      errorMessage={formik.errors.firstName}
                      disabled={formik.isSubmitting}
                    />

                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      endIcon={<CiUser size={22}/>}
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={() => formik.handleBlur}
                      error={formik.touched.lastName && formik.errors.lastName ? true : false}
                      errorMessage={formik.errors.lastName}
                      disabled={formik.isSubmitting}
                    />
                </div>
              </div>

              <div className="mb-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  endIcon={<CiMail size={22}/>}
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  error={formik.touched.email && formik.errors.email ? true : false}
                  errorMessage={formik.errors.email}
                  disabled={formik.isSubmitting}
                />
              </div>

              <div className="mb-4">
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Enter unique username"
                    endIcon={<CiUser size={22}/>}
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.username && formik.errors.username ? true : false}
                    errorMessage={formik.errors.username}
                    disabled={formik.isSubmitting}
                  />

                  <Input
                    label="Mobile Number"
                    type="text"
                    placeholder="Enter your mobile number"
                    endIcon={<CiPhone size={22}/>}
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.mobileNumber && formik.errors.mobileNumber ? true : false}
                    errorMessage={formik.errors.mobileNumber}
                    disabled={formik.isSubmitting}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    endIcon={<CiLock size={22}/>}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    errorMessage={formik.errors.password}
                    disabled={formik.isSubmitting}
                  />

                  <Input
                    label="Re-type Password"
                    type="password"
                    placeholder="Re-enter your password"
                    endIcon={<CiLock size={22}/>}
                    id="repassword"
                    name="repassword"
                    value={formik.values.repassword}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.repassword && formik.errors.repassword ? true : false}
                    errorMessage={formik.errors.repassword}
                    disabled={formik.isSubmitting}
                  />
                </div>
              </div>

              {isError &&
                <p className="text-danger">{errorMessage}</p>
              }


              <div className="mb-5 mt-4">
                {loading ? 
                   <Throbber/>
                  :
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                }
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{" "}
                  <Link href="/signin" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default SignUp;