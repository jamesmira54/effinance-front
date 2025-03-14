import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface StudentProfileFormProps {
    age?: number | undefined;
    gender?: SelectOption | null;
    birthdate?: string | undefined;
    primaryAddress: string | undefined;
    secondaryAddress: string | undefined;
    school?: SelectOption | null;
    schoolYear?: number | undefined;
    fathersFName?: string | undefined;
    fathersMName?: string | undefined;
    fathersLName?: string | undefined;
    fathersAge?: number | undefined;
    fathersBirthdate?: string | undefined;
    fathersOccupation?: string | undefined;
    fathersIncome?: string | undefined;
    fathersAddress?: string | undefined;
    fathersPhone?: string | undefined;
    mothersFName?: string | undefined;
    mothersMName?: string | undefined;
    mothersLName?: string | undefined;
    mothersAge?: number | undefined;
    mothersBirthdate?: string | undefined;
    mothersOccupation?: string | undefined;
    mothersIncome?: string | undefined;
    mothersAddress?: string | undefined;
    mothersPhone?: string | undefined;
    numberOfSibling?: number | undefined;
    siblings?: string | undefined
}