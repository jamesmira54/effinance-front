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
import { APIApplicationResponse } from "@/types";
import { MdUpdate } from "react-icons/md";
import RankedStudentsListingForm from "./RankedStudentsListingForm";
import { SponsorshipAPIService } from "@/api";
import { APPLICATION_STAGE } from "@/utils/constant";
import { useLoader } from "@/context/LoaderContext";


const StyledModal = styled(Modal)`
    overflow: auto;
    width: 500px;
`;


interface serverDataProps {
    rankedStudents: RankStudentResponse[];
    sponsorId: string;
}

const RankedStudentsListing: React.FC<{serverData: serverDataProps}> = ({
    serverData
}) => {

    const router = useRouter();
    const { showLoader, hideLoader } = useLoader();
    const [data, setData] = useState<RankStudentResponse[]>(serverData.rankedStudents || []);
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>({} as any);


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
        { name: <div className="flex justify-center w-full">Action</div>, cell: (row:any) => ( 
            <div className="flex justify-center w-full">
                <div className="flex items-center space-x-4">
                    <Button onClick={() => handleAction(row)} variants="text" color="warning" startIcon={<MdUpdate size={18}/>}>Update Status</Button>
                </div>
            </div>
        )},
    ], []);


    const [selectedEvaluation, setSelectedEvaluation] = useState<any[]>([]);

    const showEvaluation = (evaluation: any[]) => {
        let evalString: SetStateAction<any[]> = [];
        Object.entries(evaluation).forEach(([key, value]) => {
            evalString.push(`${capitalized(key)}: ${value}`);
        });
        setSelectedEvaluation(evalString);
    };

    const handleBack = () => {
        router.back();
    };

     const handleAction = (item: APIApplicationResponse) => {    
        setSelectedItem({ ...item, sponsorId: serverData.sponsorId });
        setOpenFormModal(true);
    }

    const handleSuccess = async (updateItem: any) => {
        showLoader();
        setSelectedItem(updateItem)
        setTimeout(() => {
            setOpenFormModal(false);
        }, 1000);
        hideLoader();
    };


    return (
       <div className="p-4 space-y-6">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">Ranking Results | {data.length} Students</h2>
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

            <StyledModal isFullscreen={false} title="Update Status" className="max-w-180" isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
                <RankedStudentsListingForm initialData={selectedItem}  onSuccess={(item: any) => handleSuccess(item)} />
            </StyledModal>

        </div>
    )
};

export default RankedStudentsListing;