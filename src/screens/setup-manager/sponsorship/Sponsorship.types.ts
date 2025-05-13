import { SelectOption } from "@/components/Inputs/Select/Select.types";

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