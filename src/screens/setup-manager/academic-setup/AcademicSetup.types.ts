import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface AcademicSetupFormProps {
    academicYearStart: number;
    academicYearEnd: number;
    schoolTerm: SelectOption | null;
    dateFrom: string;
    dateTo:  string;
}


