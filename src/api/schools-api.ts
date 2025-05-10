import { APISchoolPayload } from "@/types/shools.types";
import AxiosAPI from "./axios-api";

interface SchoolAPI {
    getAllSchools: () => Promise<any>;
    addSchool: (payload: APISchoolPayload) => Promise<any>;
    updateSchool: (id: string, payload: any) => Promise<any>;
    deleteSchool: (id: string) => Promise<any>;
}

export default class SchoolAPIService extends AxiosAPI implements SchoolAPI {
    private static _instance: SchoolAPIService;

    constructor() {
        super({ resourcePath: "/api/v1/schools" });
        if (SchoolAPIService._instance) {
            return SchoolAPIService._instance;
        }
        SchoolAPIService._instance = this;
    }

    async getAllSchools() {
        try {
            const response = await this.get({ path: "/" });
            return response;
        } catch (error) {
            console.error("Failed to fetch all schools", error);
            throw error;
        }
    }

    async addSchool(payload: APISchoolPayload) {
        try {
            const response = await this.post({ path: "/", body: payload });
            return response;
        } catch (error) {
            console.error("Failed to add school", error);
            throw error;
        }
    }

    async updateSchool(id: string, payload: any) {
        try {
            const response = await this.put({ path: `/${id}`, body: payload });
            return response;
        } catch (error) {
            console.error("Failed to update school", error);
            throw error;
        }
    }

    async deleteSchool(id: string) {
        try {
            const response = await this.delete({ path: `/${id}` });
            return response;
        } catch (error) {
            console.error("Failed to delete school", error);
            throw error;
        }
    }
}