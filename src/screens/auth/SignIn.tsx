"use client";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Inputs/Input";
import { CiLock, CiMail } from "react-icons/ci";
// import { login } from "@/lib/AuthService/authService";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginFormProps } from "./Auth.types";
import { useState } from "react";
import Throbber from "@/components/common/Throbber";
import { AuthAPIService } from "@/api";


const SignIn: React.FC = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const authAPI = new AuthAPIService();

  const LoginHandler = async(values: LoginFormProps, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      setSubmitting(true);
      await authAPI.login(values);
      router.push("/dashboard");
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.response?.data.errorDetails || "Invalid credentials")
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  const formik = useFormik<LoginFormProps>({
    initialValues: {
      username: "",
      password: ""
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (values, { setSubmitting }) => {
      LoginHandler(values, setSubmitting);
      setLoading(true);
    }
  });
  
  return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-hidden">
        <div className="flex flex-wrap items-center justify-center">
          <div className=" border-stroke dark:border-strokedark xl:border-r xl:border-l" style={{height: '99vh', width: '500px'}}>
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
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
                Sign In to Efinas
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <Input
                    label="Username"
                    placeholder="Enter your username"
                    type="text"
                    endIcon={<CiMail size={22}/>}
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.username && formik.errors.username ? true : false}
                    errorMessage={formik.errors.username}
                    disabled={formik.isSubmitting}
                  />
                </div>

                <div className="mb-2">
                  <Input
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    endIcon={<CiLock size={22}/>}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={() => formik.handleBlur}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    errorMessage={formik.errors.password}
                    disabled={formik.isSubmitting}
                  />
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
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  }
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link href="/signup" className="text-primary">
                      Sign Up
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
  
  export default SignIn;