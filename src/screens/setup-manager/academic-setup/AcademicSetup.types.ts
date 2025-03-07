import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface AcademicSetupFormProps {
    academicYear: string;
    schoolTerm: SelectOption | null;
    dateCovered: string;
    status:  SelectOption | null;
}


