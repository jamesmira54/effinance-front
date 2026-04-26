import Button from "@/components/Button";
import { AnnouncementDetailsProps } from "@/types";
import { capitalized } from "@/utils/helpers";
import { IoEyeOutline } from "react-icons/io5";

const AnnouncementsView: React.FC<{details: AnnouncementDetailsProps}> = ({
    details
}) => {

    const openFile = (path: string) => {
        window.open(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, "_blank", "noopener,noreferrer");
    }

    return (
        <>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p><span className="font-bold">Title: </span>{details.title}</p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p><span className="font-bold">Sponsorship: </span>{details.sponsorshipName}</p>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p><span className="font-bold">Location (Municipality): </span></p>
                    <ul className="list-disc list-inside">
                        {details.locations.map((location) => (
                            <li className="px-3" key={location.id}>{capitalized(location.name)}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p className="font-bold">Content:</p>
                    <div className="p-4 border rounded-md mt-2">
                        <p>{details.content}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                <div className="w-full">
                    <p><span className="font-bold">Attachments: </span></p>
                    <ul className="list-none list-inside">
                        {details.files.map((attachment, index) => (
                            <li className="px-3" key={attachment.id}>
                                <Button style={{textAlign: "left"}} onClick={() => openFile(attachment.path)} variants="text" startIcon={<IoEyeOutline size={21}/>}>
                                    {index + 1}. {attachment.fileName}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    );
}

export default AnnouncementsView;