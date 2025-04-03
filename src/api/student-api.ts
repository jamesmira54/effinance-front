import AxiosAPI from "./axios-api";

interface StudentAPI {
    getStudentProfile: (studentId: string) => Promise<any>;
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

    async getStudentProfile(studentId: string) {
        try {
            const response = await this.get({ path: `/${studentId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch student profile", error);
            throw error;
        }
    }
    
}