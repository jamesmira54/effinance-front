import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface SchoolFormProps {
    province: SelectOption | null;
    city: SelectOption | null;
    municipality: SelectOption | null;
    barangay: SelectOption | null;
    schoolName: string;
    schoolType: SelectOption | null;
}