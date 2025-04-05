export interface LoginFieldProps {
    username: string, 
    password: string
}

export interface SignUpFormProps {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobileNumber: string;
    password: string;
    repassword: string;
}

export interface APIModuleProps {
    moduleId: string;
    moduleName: string;
    roleId: string;
    show: boolean;
    save: boolean;
    delete: boolean;
}

export interface APILoginResponse {
    user: string;
    userId: string;
    studentId: string | null;
    token: string;
    permissions: APIModuleProps[];
}
  

export interface APISignUpResponse {
    user: string;
    userId: string;
    studentId: string | null;
    token: string;
    permissions: APIModuleProps
}


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