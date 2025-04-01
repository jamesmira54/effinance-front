import React from "react";
import { Metadata } from "next";
import SignIn from "@/screens/auth/SignIn";

export const metadata: Metadata = {
  title: "Sign-In | Efinas",
};

const LoginPage = async () => {
  return (
    <SignIn/>
  );
};

export default LoginPage;

