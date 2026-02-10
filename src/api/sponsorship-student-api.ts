import AxiosAPI from "./axios-api";

interface SponsorshipStudentAPI {
    getAvailableSponsorships: (studentId: string) => Promise<any>;
    getSponsorshipApplied: (studentId: string) => Promise<any>;
}

export default class SponsorshipStudentAPIService extends AxiosAPI implements SponsorshipStudentAPI {
    private static _instance: SponsorshipStudentAPIService;

    constructor() {
        super({ resourcePath: "/api/v1/sponsorships/student" });
        if (SponsorshipStudentAPIService._instance) {
            return SponsorshipStudentAPIService._instance;
        }
        SponsorshipStudentAPIService._instance = this;
    }

    async getAvailableSponsorships(studentId: string) {
        try {
            const response = await this.get({ path: `/student/available/${studentId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch available sponsorships", error);
            throw error;
        }
    }

    async getSponsorshipApplied(studentId: string) {
        try {
            const response = await this.get({ path: `/student/my-sponsorships/${studentId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch sponsorships by student ID", error);
            throw error;
        }
    }

    async getSpecificSponsorship(sponsorshipId: string) {
        try {
            const response = await this.get({ path: `/${sponsorshipId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch specific sponsorship for student", error);
            throw error;
        }
    }
}