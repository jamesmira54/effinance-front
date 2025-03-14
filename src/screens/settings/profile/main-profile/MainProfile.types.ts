import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface MainProfileFormProps {
    firstName: string;
    lastName: string;
    middleName?: string;
    emailAddress: string;
    phone?: string;
    role?: SelectOption | null;
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    linkedInUrl?: string | null;
    twitterUrl?: string | null;
    profileImageLink?:  string | null;
}