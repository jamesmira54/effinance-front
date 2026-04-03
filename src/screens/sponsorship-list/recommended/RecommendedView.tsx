import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { capitalizeAndSpace, FormattedDate } from "@/utils/helpers";

const RecommendedView: React.FC<{details: APISponsorshipListResponse}> = ({
    details
}) => {
    return (
        <>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Name: <span className="font-bold">{details.name}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Sponsor: <span className="font-bold">{details.sponsorName}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <p>Coordinator: <span className="font-bold">{details.coordinatorName}</span></p>
                </div>
            </div>
           <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <p>Academic Year Start: <span className="font-bold">{details.academicYearStart}</span></p>
                </div>
                <div className="w-full xl:w-1/2">
                    <p>Academic Year End: <span className="font-bold">{details.academicYearEnd}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <p>From: <span className="font-bold">{FormattedDate(details.durationFrom)}</span></p>
                </div>
                <div className="w-full xl:w-1/2">
                    <p>To: <span className="font-bold">{FormattedDate(details.durationTo)}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <p>Batch Number: <span className="font-bold">{details.batchNumber}</span></p>
                </div>
                <div className="w-full xl:w-1/2">
                    <p>Limit: <span className="font-bold">{Number(details.limit)?.toLocaleString()}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <p>Slot: <span className="font-bold">{Number(details.slot)?.toLocaleString()}</span></p>
                </div>
                <div className="w-full xl:w-1/2">
                    <p>Fund Allocation: <span className="font-bold">₱ {Number(details.fundAllocation)?.toLocaleString()}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <p>Status: <span className="font-bold">{capitalizeAndSpace(details.status)}</span></p>
                </div>
            </div>
        </>
    );
}

export default RecommendedView;