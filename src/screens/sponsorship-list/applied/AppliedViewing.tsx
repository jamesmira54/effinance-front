import { AppliedSponsorshipDetailResponse } from "@/types/sponsorship.types";
import { FormattedDate } from "@/utils/helpers";

const formatStatus = (status: unknown) => {
    if (typeof status !== "string") return "Unknown";

    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const AppliedViewing: React.FC<{details: AppliedSponsorshipDetailResponse}> = ({
    details
}) => {
    return (
        <>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>App ID: <span className="font-bold">{details.appId}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Program Name: <span className="font-bold">{details.programName}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Sponsorship Name: <span className="font-bold">{details.sponsorshipName}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Status: <span className="font-bold">
                        {formatStatus(details.sponsorshipStatus)}
                    </span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Year Level: <span className="font-bold">{details.yearLevel}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Remarks: <span className="font-bold">{details.sponsorshipRemarks}</span></p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p>Application Date: <span className="font-bold">{details.applicationDate ? FormattedDate(details.applicationDate) : "—"}</span></p>
                </div>
            </div>
        </>
    );
}

export default AppliedViewing;
