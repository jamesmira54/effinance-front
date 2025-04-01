import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Schedules",
};

const SchedulesPage: React.FC = () => {
    return (
      <>
        <p>Schedules Page</p>
      </>
    );
  };
  
export default SchedulesPage;