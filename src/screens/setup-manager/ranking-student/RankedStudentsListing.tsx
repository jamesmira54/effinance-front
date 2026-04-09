"use client";

import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import { SetStateAction, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { styled } from "styled-components";
import { RankStudentResponse } from "@/types/sponsorship.types";
import { capitalized } from "@/utils/helpers";
import { FaRegEye } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";


const StyledModal = styled(Modal)`
    overflow: auto;
    width: 500px;
`;


interface serverDataProps {
    rankedStudents: RankStudentResponse[];
}

const RankedStudentsListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {

    const router = useRouter();
    const [data, setData] = useState<RankStudentResponse[]>(serverData.rankedStudents || []);


    const columns: TableColumn<RankStudentResponse>[] = useMemo(() => [
        { name: "Student Name", selector: (row:RankStudentResponse) => row.name },
        { name: <div className="flex justify-center w-full">Score</div>, cell: (row:RankStudentResponse) => (
            <div className="flex justify-center w-full">{row.score}</div>
        )},
        { name: <div className="flex justify-center w-full">Evaluation</div>, cell: (row:RankStudentResponse) => (
            <div className="flex justify-center w-full">
                <Button onClick={() => showEvaluation(row.evaluation) } variants="text" startIcon={<FaRegEye className='text-success hover:text-primary' size={20}/>}/>
            </div>
        )},
    ], []);


    const [selectedEvaluation, setSelectedEvaluation] = useState<any[]>([]);

    const showEvaluation = (evaluation: any[]) => {
        console.log("Showing evaluation for student. Evaluation data: ", evaluation);
        let evalString: SetStateAction<any[]> = [];
        Object.entries(evaluation).forEach(([key, value]) => {
            evalString.push(`${capitalized(key)}: ${value}`);
        });
        setSelectedEvaluation(evalString);
    };

    const handleBack = () => {
        router.back();
    };


    return (
       <div className="p-4 space-y-6">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">Ranking | {data.length} Students</h2>
            <Button startIcon={<IoIosArrowRoundBack/>} onClick={handleBack} variants={'text'}>Go Back</Button>
            <div className="max-w-full overflow-x-auto">
              <DataTable 
                  columns={columns} 
                  data={data} 
                  pagination 
                  highlightOnHover 
                  striped
              />
            </div>

            <StyledModal isFullscreen={false} title="Evaluation Details" className="min-w-125" isOpen={selectedEvaluation.length > 0} onClose={() => setSelectedEvaluation([])}>
                <ul className="flex flex-col gap-4">
                    {selectedEvaluation.map((item: any, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </StyledModal>

        </div>
    )
};

export default RankedStudentsListing;