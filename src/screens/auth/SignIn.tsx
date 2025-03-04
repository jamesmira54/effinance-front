"use client";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Inputs/Input";
import { CiLock, CiMail } from "react-icons/ci";

const SignIn: React.FC = () => {
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
  
                <form>
                  <div className="mb-4">
                    <Input
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        endIcon={<CiMail size={22}/>}
                    />
                  </div>
  
                  <div className="mb-6">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        endIcon={<CiLock size={22}/>}
                    />
                  </div>
  
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
  
                  <div className="mt-6 text-center">
                    <p>
                      Don’t have any account?{" "}
                      <Link href="/auth/signup" className="text-primary">
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