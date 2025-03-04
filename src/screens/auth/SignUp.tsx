"use client";
import Input from "@/components/Inputs/Input";
import Link from "next/link";
import Image from "next/image";
import { CiLock, CiMail, CiPhone, CiUser } from "react-icons/ci";


const SignUp: React.FC = () => {
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-r xl:border-l">
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
  
              <form>
                <div className="mb-4">
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="First Name"
                            type="text"
                            placeholder="Enter your first name"
                            endIcon={<CiUser size={22}/>}
                        />

                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Enter your last name"
                            endIcon={<CiUser size={22}/>}
                        />
                    </div>
                </div>
  
                <div className="mb-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        endIcon={<CiMail size={22}/>}
                    />
                </div>


                <div className="mb-4">
                    <Input
                        label="Phone Number"
                        type="text"
                        placeholder="Enter your phone number"
                        endIcon={<CiPhone size={22}/>}
                    />
                </div>
  
                <div className="mb-4">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        endIcon={<CiLock size={22}/>}
                    />
                </div>
  
                <div className="mb-6">
                    <Input
                        label="Re-type Password"
                        type="password"
                        placeholder="Re-enter your password"
                        endIcon={<CiLock size={22}/>}
                    />
                </div>
  
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
  
                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-primary">
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