import { APIUserProfileResponse } from "@/types";
import AxiosAPI from "./axios-api";

interface userAPI {
    profile: (userId: string) => Promise<APIUserProfileResponse>;
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

    async profile(userId: string) {
        try {
            const response: APIUserProfileResponse = await this.get({path: `/${userId}`});
            return response;
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            throw error;
        }  
    }

}