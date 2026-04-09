'use client';

import { useFormik } from 'formik';
import { APISponsorshipListResponse, CustomCriterionData, studentsAPI } from "@/types/sponsorship.types";
import { capitalizeAndSpace } from '@/utils/helpers';
import Button from '@/components/Button';
import Throbber from "@/components/common/Throbber";
import { SponsorshipAPIService } from '@/api';
import { useState } from 'react';
import Alert from '@/components/Alert';
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

interface serverDataProps {
  sponsorshipDetails: APISponsorshipListResponse;
  customCriterionData: CustomCriterionData[];
}

const CriteriaCustomInput: React.FC<{ serverData: serverDataProps }> = ({ serverData }) => {

    const SponsorshipAPI = new SponsorshipAPIService();

    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const studentList = serverData.sponsorshipDetails?.students || [];
    const criterionList = serverData.sponsorshipDetails?.criterion || [];
    const sponsorshipId = serverData.sponsorshipDetails?.id;
    const router = useRouter();


    const existingData = serverData.customCriterionData.filter(
        (item) => item.sponsorshipId === sponsorshipId
    );

    const lookup = existingData.reduce((acc: any, item) => {
        acc[`${item.studentId}-${item.sponsorshipCriterionId}`] = item.value;
        return acc;
    }, {});

    const initialValues = {
        inputs: studentList.reduce((acc: any, student) => {
            acc[student.studentId] = {};

            criterionList.forEach((criterion) => {
                if (criterion.dataSource === 'CUSTOM_INPUT') {
                    const key = `${student.studentId}-${criterion.id}`;

                    acc[student.studentId][criterion.id] =
                    lookup[key] ?? '';
                }
            });

            return acc;
        }, {})
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const payload: any[] = [];

            Object.keys(values.inputs).forEach((studentId) => {
                Object.keys(values.inputs[studentId]).forEach((criterionId) => {
                const value = values.inputs[studentId][criterionId];

                if (value !== '') {
                    payload.push({
                    sponsorshipId,
                    sponsorshipCriterionId: criterionId,
                    studentId,
                    value: Number(value),
                    });
                }
                });
            });

            if (payload.length > 0) {
                submitHandler(payload);
            } 
        }
    });

    const submitHandler = async (payload: any[]) => {
        try {
            const response = await SponsorshipAPI.updateCustomCriterionData(payload);

             if(response) {
                setError(false);
                setErrorMessage('');
            }
        } catch (error: any) {
            setError(true);
            setShowAlert(true);
            setErrorMessage(error?.message || "An error occurred while updating the custom criterion data.");
        } finally {
            setShowAlert(true);
            formik.setSubmitting(false);
        }
    }

    const handleBack = () => {
        router.back();
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-4">
                {serverData.sponsorshipDetails.name}
            </h2>
            <Button startIcon={<IoIosArrowRoundBack/>} onClick={handleBack} className="mb-4" variants={'text'}>Go Back</Button>
            {showAlert &&
                <div className="mt-5">
                    <Alert 
                        variant={isError ? 'error' : 'success'}
                        title={isError ? 'Error' : "Success!"}
                        message={isError ? errorMessage : "Application Updated Successfully!"}
                        showLink={false} 
                    />
                </div>
            }
            
            <div className="dark:border-gray-800 lg:p-6 bg-white dark:bg-slate-800 shadow-sm rounded-xl p-8 space-y-10">
                
                <h3 className="text-lg font-semibold mb-4">Criteria Custom Setup</h3>

                <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    
                    <thead>
                    <tr>
                        <th className="border px-4 py-2">Student Name</th>
                        {criterionList.map((criterion) => (
                        criterion.dataSource === 'CUSTOM_INPUT' && (
                            <th key={criterion.id} className="border px-4 py-2">
                            {capitalizeAndSpace(criterion.name)}
                            </th>
                        )
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {studentList.map((student: studentsAPI) => (
                        <tr key={student.studentId}>
                        
                        <td className="border px-4 py-2">
                            {student.studentName}
                        </td>

                        {criterionList.map((criterion) => (
                            criterion.dataSource === 'CUSTOM_INPUT' && (
                            <td key={criterion.id} className="border px-4 py-2">
                                <input
                                type="number"
                                className="w-20 border rounded-md text-center py-1"
                                name={`inputs.${student.studentId}.${criterion.id}`}
                                value={
                                    formik.values.inputs?.[student.studentId]?.[criterion.id] || ''
                                }
                                onChange={formik.handleChange}
                                />
                            </td>
                            )
                        ))}

                        </tr>
                    ))}
                    </tbody>

                </table>
                </div>
            </div>
            {criterionList.length > 0 && (
                <div className="flex justify-end mt-5">
                    {formik.isSubmitting ? 
                        <Throbber/>
                        :
                        <Button type="submit" variants="default" className='bg-primary'>
                            Save Criteria
                        </Button>
                    } 
                </div>
            )}
        </form>
    );
};

export default CriteriaCustomInput;