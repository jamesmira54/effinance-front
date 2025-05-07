import { APIStudentFilesRes, APIStudentListResponse } from "@/types";
import AxiosAPI from "./axios-api";

interface StudentAPI {
    getStudentProfile: (studentId: string) => Promise<any>;
    getStudentFiles: (studentId: string) => Promise<APIStudentFilesRes[]>;
}

export default class StudentAPIService extends AxiosAPI implements StudentAPI {
    
    private static _instance: StudentAPIService;
    constructor() {
        super({ resourcePath: "/api/v1/students" });
        if (StudentAPIService._instance) {
            return StudentAPIService._instance;
        }
        StudentAPIService._instance = this;
    }

    async getAllStudents() {
        try {
            const response: APIStudentListResponse[] = await this.get({path: '/'});
            return response;
        } catch (error) {
            console.error("Failed to fetch all users", error);
            throw error;
        }
    }

    async getStudentProfile(studentId: string) {
        try {
            const response = await this.get({ path: `/${studentId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch student profile", error);
            throw error;
        }
    }

    async updateStudentProfile(studentId: string, data: any) {
        try {
            const response = await this.put({ path: `/${studentId}`, body: data });
            return response;
        } catch (error) {
            console.error("Failed to update student profile", error);
            throw error;
        }
    }

    async getStudentFiles(studentId: string) {
        try {
            const response = await this.get({ path: `/files/${studentId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch student files", error);
            throw error;
        }
    }

    
}