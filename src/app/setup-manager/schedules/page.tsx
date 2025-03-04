import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Effinance - Schedules",
};

const SchedulesPage: React.FC = () => {
    return (
      <DefaultLayout>
        <p>Schedules Page</p>
      </DefaultLayout>
    );
  };
  
export default SchedulesPage;