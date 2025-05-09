import { APIAcademicPayload } from "@/types";
import AxiosAPI from "./axios-api";

interface AcademicAPI {
    getAllAcademicYears: () => Promise<any>;
}

export default class AcademicAPIService extends AxiosAPI implements AcademicAPI {
    
    private static _instance: AcademicAPIService;
    constructor() {
        super({ resourcePath: "/api/v1/academic-years" });
        if (AcademicAPIService._instance) {
            return AcademicAPIService._instance;
        }
        AcademicAPIService._instance = this;
    }

    async getAllAcademicYears() {
        try {
            const response = await this.get({ path: "/" });
            return response;
        } catch (error) {
            console.error("Failed to fetch all academic years", error);
            throw error;
        }
    }

    async addAcademicYear(payload: APIAcademicPayload) {
        try {
            const response = await this.post({ path: "/", body: payload });
            return response;
        } catch (error) {
            console.error("Failed to add academic year", error);
            throw error;
        }
    }

    async updateAcademicYear(id: string, payload: APIAcademicPayload) {
        try {
            const response = await this.put({ path: `/${id}`, body: payload });
            return response;
        } catch (error) {
            console.error("Failed to update academic year", error);
            throw error;
        }
    }

    async deleteAcademicYear(id: string) {
        try {
            const response = await this.delete({ path: `/${id}` });
            return response;
        } catch (error) {
            console.error("Failed to delete academic year", error);
            throw error;
        }
    }
}