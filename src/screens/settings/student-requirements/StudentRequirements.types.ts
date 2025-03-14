import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface StudentRequirementsProps {
    requirment:  SelectOption | null;
    filename: string;
    file: File | null;
}