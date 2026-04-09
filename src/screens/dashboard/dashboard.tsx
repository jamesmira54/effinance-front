"use client";
import CardDataStats from "@/components/CardDataStats";
import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChartThree from "@/components/Charts/ChartThree";
import { DashboardData, ProgressBarProps } from "@/components/Dashboard/dashboard.types";
import { camelToCapitalized, capitalizeAndSpace, capitalized } from "@/utils/helpers";


const Dashboard: React.FC<{ serverData: DashboardData }> = ({ serverData }) => {
    const {
        numberOfQualifiedStudents,
        numberOfFinancialAssistance,
        numberOfSchools,
        applicationsByStatus,
        applicationsByStage,
        schoolsByType,
        recentApplicationsCount,
        totalApplications,
    } = serverData;

    const ProgressBar = ({ label, value, total }: ProgressBarProps) => {
        const percentage = total === 0 ? 0 : (value / total) * 100;

        return (
            <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span>{value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Qualified Students" total={numberOfQualifiedStudents} rate="">
                    <PiStudentFill size={22} className="fill-primary dark:fill-white" />
                </CardDataStats>
                <CardDataStats title="Financial Assistance" total={numberOfFinancialAssistance} rate="">
                    <IoDocumentTextSharp size={22} className="fill-secondary dark:fill-white" />
                </CardDataStats>
                <CardDataStats title="Number of Schools" total={numberOfSchools} rate="">
                    <FaSchool size={22} className="fill-success dark:fill-white" />
                </CardDataStats>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white shadow p-5">
                    <h3 className="font-semibold mb-3">Applications by Status</h3>
                    {Object.entries(applicationsByStatus).map(([key, value]) => (
                        <ProgressBar
                            key={key}
                            label={camelToCapitalized(key)}
                            value={value}
                            total={totalApplications}
                        />
                    ))}
                </div>

                <div className="bg-white shadow p-5">
                    <h3 className="font-semibold mb-3">Applications by Stage</h3>
                    {Object.entries(applicationsByStage).map(([key, value]) => (
                        <ProgressBar
                            key={key}
                            label={camelToCapitalized(key)}
                            value={value}
                            total={totalApplications}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white shadow p-5">
                    <h3 className="font-semibold mb-3">Schools by Type</h3>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Public</p>
                            <p className="text-xl font-bold">{schoolsByType.public}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Private</p>
                            <p className="text-xl font-bold">{schoolsByType.private}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow p-5">
                    <h3 className="font-semibold mb-3">Activity</h3>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Recent Applications</p>
                            <p className="text-xl font-bold">{recentApplicationsCount}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Applications</p>
                            <p className="text-xl font-bold">{totalApplications}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
