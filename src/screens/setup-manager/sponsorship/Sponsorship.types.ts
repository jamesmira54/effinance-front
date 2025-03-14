import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface SponsorshipFormProps {
    financialAssistanceName: string;
    sponsor: string;
    academicYear:  SelectOption | null;
    duration: string;
    batch: number;
    slots: number;
    limit: number;
    fundAllocation: number;
    schools: SelectOption[] | null | undefined;
    requirements: SelectOption[] | null | undefined;
}