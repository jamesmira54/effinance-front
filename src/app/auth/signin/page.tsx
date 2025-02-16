import React from "react";
import { Metadata } from "next";
import SignIn from "@/screens/auth/SignIn";

export const metadata: Metadata = {
  title: "Sign-In | Efinas",
};

const SignInPage: React.FC = () => {
  return (
    <SignIn/>
  );
};

export default SignInPage;

