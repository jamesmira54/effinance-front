import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface AnnouncementsListProps {
    id: string;
    title: string;
    content: string;
    caption: string;
    sponsorshipId: string;
    sponsorshipName?: string;
}


export interface AnnouncementDetailsProps {
    id: string;
    title: string;
    content: string;
    caption: string;
    sponsorshipId: string;
    sponsorshipName?: string;
    locations: AnnouncementLocationsProps[];
    files: AnnouncementFileProps[];
}

export interface AnnouncementLocationsProps {
    id: string;
    name: string;
}


export interface AnnouncementFileProps {
    id: string;
    fileName: string;
    path: string;
}

export interface AnnouncementGetPayload {
    sort?: string;
    search?: string;
    mine?: boolean;
    cityMunId?: string;
    offset: number;
    limit: number;
}

export interface AnnouncementCreatePayload {
    title: string;
    content: string;
    caption: string;
    targetMunicipalitys: SelectOption[] | null;
    sponsorshipId: string;
    files: File[];
}