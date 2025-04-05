import { APIUserRoles } from "@/types";
import AxiosAPI from "./axios-api";

interface RolesAPI {
    roles(): Promise<APIUserRoles[]>;
}

export default class RolesAPIService extends AxiosAPI implements RolesAPI {
    
    private static _instance: RolesAPIService;
    constructor() {
        super({ resourcePath: "/api/v1/roles" });
        if (RolesAPIService._instance) {
            return RolesAPIService._instance;
        }
        RolesAPIService._instance = this;
    }

    async roles(): Promise<APIUserRoles[]> {
        try {
            const response:APIUserRoles[] = await this.get({});
            return response;
        } catch (error) {
            console.error("Failed to fetch user roles", error);
            throw error;
        }
    }
    
}