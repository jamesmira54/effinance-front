import React from "react";
import { Metadata } from "next";
import SignUp from "@/screens/auth/SignUp";

export const metadata: Metadata = {
  title: "Sign-Up | Efinas",
};

const SignUpPage: React.FC = () => {
  return (
    <SignUp/>
  );
};

export default SignUpPage;
