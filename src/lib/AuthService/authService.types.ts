export interface APIModuleProps {
    moduleId: string;
    moduleName: string;
    roleId: string;
    show: boolean;
    save: boolean;
    delete: boolean;
}

export interface APILoginForm {
    username: string;
    password: string;
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