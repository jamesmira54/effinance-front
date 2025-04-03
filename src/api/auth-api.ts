import { APILoginResponse, APISignUpResponse, APIUserProfileResponse, LoginFieldProps, SignUpFormProps } from "@/types";
import AxiosAPI from "./axios-api";
import { AxiosResponse } from "axios";
import { setCookie } from "cookies-next";


interface AuthAPI {
    login: (payload: LoginFieldProps) => Promise<APILoginResponse>;
    signUp: (payload: SignUpFormProps) => Promise<APISignUpResponse>;
    me: (token: string) => Promise<APILoginResponse>;
}

export default class AuthAPIService extends AxiosAPI implements AuthAPI {

    private static _instance: AuthAPIService;
    constructor() {
        super({  resourcePath: "/api/v1/auth" }); 
        if (AuthAPIService._instance) {
            return AuthAPIService._instance;
        }
        AuthAPIService._instance = this;
    }


    async login(payload: LoginFieldProps) {
        try {
          const response: APILoginResponse = await this.post({path: '/login', body: payload});
          
          const token = response.token;
    
         setCookie("token", token, {
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
            secure: true,
            sameSite: "none"
        });
    
          return response;
        } catch (error: any) {
          console.error("Login failed", error.response?.data.errorDetails);
          throw error;
        }
      }

    async signUp(payload: SignUpFormProps) {
        try {
            const response: APISignUpResponse = await this.post({path: '/student/register', body: payload});
            
            const token = response.token;
      
            setCookie("token", token, {
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
                secure: true,
                sameSite: "none"
            });
      
            return response;
          } catch (error) {
            console.error("Register failed", error);
            throw error;
          }
    }

    async me() {
        try {
            const response: APILoginResponse = await this.get({path: '/me'});
            return response;
        } catch (error) {
            console.error("Failed to fetch user session", error);
            throw error;
        }
    }

}