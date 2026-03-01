import AxiosAPI from "./axios-api";

interface SponsorshipAPI {
    createSponsorship: (payload: any) => Promise<any>;
}

export default class SponsorshipAPIService extends AxiosAPI implements SponsorshipAPI {
    private static _instance: SponsorshipAPIService;

    constructor() {
        super({ resourcePath: "/api/v1/sponsorships" });
        if (SponsorshipAPIService._instance) {
            return SponsorshipAPIService._instance;
        }
        SponsorshipAPIService._instance = this;
    }

    async getAllSponsorships(sponsorshipId?: string) {
        try {
            const query = sponsorshipId ? `/${sponsorshipId}` : "";
            const response = await this.get({ path: `/coordinator${query}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch all sponsorships", error);
            throw error;
        }
    }

    async createSponsorship(payload: any) {
        try {
            const response = await this.post({ path: "/coordinator", body: payload });
            return response;
        } catch (error) {
            console.error("Failed to create sponsorship", error);
            throw error;
        }
    }

    async updateSponsorship(sponsorshipId: string, payload: any) {
        try {
            const response = await this.put({ path: `/coordinator/${sponsorshipId}`, body: payload });
            return response;
        } catch (error) {
            console.error("Failed to update sponsorship", error);
            throw error;
        }
    }

    async deleteSponsorship(sponsorshipId: string) {
        try {
            const response = await this.delete({ path: `/coordinator/${sponsorshipId}` });
            return response;
        } catch (error) {
            console.error("Failed to delete sponsorship", error);
            throw error;
        }
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

    async getAllApplications(applicationStage: string) {
        try{
            const response = this.get({ path: `/applicants/by-stage?applicationStage=${applicationStage}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch all applications", error);
            throw error;
        }
    }

    async getAllCriterionCategories() {
        try {
            const response = await this.get({ path: "/criterion-category" });
            return response;
        } catch (error) {
            console.error("Failed to fetch criterion categories", error);
            throw error;
        }
    }
}