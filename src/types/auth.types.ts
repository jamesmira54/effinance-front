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
    parentId: string | null;
    parentName: string | null;
    roleId: string;
    roleName: string;
    show: boolean;
    edit: boolean;
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

