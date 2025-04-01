import api, { setAuthHeader } from "@/lib/api";
import { setCookie, deleteCookie, getCookie} from "cookies-next";
import { APILoginResponse, APISignUpResponse, APIUserProfileResponse } from "./authService.types";
import { LoginFormProps, SignUpFormProps } from "@/screens/auth/Auth.types";

export const login = async ({username, password}: LoginFormProps): Promise<void> => {
  try {
    const response = await api.post<APILoginResponse>("/auth/login", { username, password });
    // Store token in cookie
    setCookie("token", response.data.token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      secure: true,
      sameSite: "none"
    });

  } catch (error: any) {
    throw new Error(error?.errorDetails || "Invalid email or password");
  }
};

export const signup = async ({
  firstName, 
  lastName, 
  username, 
  email, 
  mobileNumber, 
  password, 
  repassword
}: SignUpFormProps) : Promise<void> => {
  try {
    
    const response = await api.post<APISignUpResponse>("/auth/student/register", {
      firstName,
      lastName,
      username,
      email,
      mobileNumber,
      password,
      repassword
    });

    setCookie("token", response.data.token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      secure: true,
      sameSite: "none"
    });


  } catch (error: any) {
    console.log(error); 
    throw new Error(error.errorDetails.errors[0].msg || "Something went wrong, please try again later.");
  }
}

export const logout = async () => {
  deleteCookie("token");
  window.location.href = "/login";
};


export const getUserSession = async(token: string | undefined): Promise<APIUserProfileResponse> => {
  setAuthHeader(token || '');
  try {
    const sessionResponse = await api.get<APILoginResponse>(`/auth/me`);
    const userProfile = await api.get<APIUserProfileResponse>(`/users/${sessionResponse.data.userId}`);
    return userProfile.data;
  } catch (error: any) {
    const errorMessage = error.errorDetails || 
    "Something went wrong, please try again later.";
    throw new Error(errorMessage);
  }
};
