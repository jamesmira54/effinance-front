import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface UserAccountListingFormProps {
    firstname: string;
    middlename?: string | undefined;
    lastname:  string;
    email: string;
    phoneNumber?: string;
    password: string;
    confirmPassword: string;
    role:  SelectOption | null;
}