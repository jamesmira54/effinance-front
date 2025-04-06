import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface MainProfileFormProps {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    mobileNumber?: string;
    roleId?: SelectOption | null;
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    linkedInUrl?: string | null;
    twitterUrl?: string | null;
    profileImageLink?:  string | null;
}