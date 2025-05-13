import { APIUserListResponse, APIUserProfileResponse, APIUserUpdateResponse, MainProfileFormPayload } from "@/types";
import AxiosAPI from "./axios-api";

interface userAPI {
    profile: (userId: string) => Promise<APIUserProfileResponse>;
    updateProfile: (userId: string, data: MainProfileFormPayload) => Promise<APIUserUpdateResponse>;
}


export default class UserAPIService extends AxiosAPI implements userAPI {

    private static _instance: UserAPIService;
    constructor() {
        super({ resourcePath: "/api/v1/users" });
        if (UserAPIService._instance) {
            return UserAPIService._instance;
        }
        UserAPIService._instance = this;
    }

    async getAllUsers(sponsor?: boolean) {
        try {
            const query = sponsor ? `?sponsor=${sponsor}` : "";
            const response: APIUserListResponse = await this.get({path: `/${query}`});
            return response;
        } catch (error) {
            console.error("Failed to fetch all users", error);
            throw error;
        }
    }

    async profile(userId: string) {
        try {
            const response: APIUserProfileResponse = await this.get({path: `/${userId}`});
            return response;
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            throw error;
        }  
    }

    async updateProfile(userId: string, data: MainProfileFormPayload) {
        try {
            const response: APIUserUpdateResponse = await this.put({path: `/${userId}`, body: data});
            return response;
        } catch (error) {
            console.error("Failed to update user profile", error);
            throw error;
        }
    }

}