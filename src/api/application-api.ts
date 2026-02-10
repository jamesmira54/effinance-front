import AxiosAPI from "./axios-api";

interface ApplicationAPI {
    updateApplicationStatus: (studentId: string, payload: any) => Promise<any>;
}

export default class ApplicationAPIService extends AxiosAPI implements ApplicationAPI {
    private static _instance: ApplicationAPIService;

    constructor() {
        super({ resourcePath: '/api/v1/sponsorships/coordinator' });
        if (ApplicationAPIService._instance) {
            return ApplicationAPIService._instance;
        }
        ApplicationAPIService._instance = this;
    }

    async updateApplicationStatus(studentId: string, payload: any): Promise<any> {
        try {
            const response = await this.put({ path: `/students/${studentId}/status`, body: payload });
            return response;
        } catch (error) {
            console.error("Failed to update application status", error);
            throw error;
        }
    }
}
