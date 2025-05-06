import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface UserAccountListingFormProps {
    firstName: string;
    lastName:  string;
    username: string;
    email: string;
    mobileNumber?: string;
    password: string;
    repassword: string;
    roleId:  SelectOption | null;
}