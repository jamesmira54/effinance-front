export interface APIUserProfileResponse {
    username: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    mobileNumber: string | null;
    userId: string;
    email: string;
    userTypeId: string;
    userType: string;
}

export interface APIUserRoles {
    id: string
    name: string;
    description: string;
}

export interface MainProfileFormPayload {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    mobileNumber?: string;
    roleId?: string
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    linkedInUrl?: string | null;
    twitterUrl?: string | null;
    profileImageLink?:  string | null;
}

export interface APIUserUpdateResponse {
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    mobileNumber?: string;
    userId: string;
    email: string;
    userTypeId: string;
    userType: string;
}
