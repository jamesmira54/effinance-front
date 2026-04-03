import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { SponsorshipRequirements, SponsorshipSchoolProps } from "@/types/sponsorship.types";
import { Criteria, Pairwise } from "../criteria-setup/CriteriaSetup.types";

export interface SponsorshipFormProps {
    name: string;
    sponsorId: SelectOption | null;
    academicYearId:  SelectOption | null;
    durationFrom: string;
    durationTo: string;
    batchNumber: number;
    limit: number;
    slot: number;
    fundAllocation: number;
    sponsorshipRequirements: SelectOption[] | null;
    sponsorshipSchool: SelectOption[] | null;
}


export interface SponsorshipDetailsProps {
    id: string;
    name: string;
    sponsorId: string;
    sponsorName: string;
    coordinatorId: string;
    coordinatorName: string;
    academicYearId: string;
    academicYearEnd: number;
    academicYearStart: number;
    durationFrom: string;
    durationTo: string;
    batchNumber: number;
    limit: number;
    slot: number;
    fundAllocation: number;
    status: string;
    studentCount: number;
    sponsorshipSchool: SponsorshipSchoolProps[];
    sponsorshipRequirements: SponsorshipRequirements[];
    students: any[],
    criterion: Criteria[];
    pairwise: Pairwise[];
}