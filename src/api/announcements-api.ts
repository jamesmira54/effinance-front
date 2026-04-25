import { AnnouncementCreatePayload, AnnouncementDetailsProps, AnnouncementGetPayload, AnnouncementsListProps } from "@/types";
import AxiosAPI from "./axios-api";

interface AnnouncementsAPI {
    getAnnouncements: (payload: AnnouncementGetPayload) => Promise<AnnouncementsListProps[]>;
    getAnnouncementDetails: (announcementId: string) => Promise<AnnouncementDetailsProps>;
    updateAnnouncement: (announcementId: string, payload: AnnouncementCreatePayload) => Promise<AnnouncementDetailsProps>;
    deleteAnnouncement: (announcementId: string) => Promise<any>;
    createAnnouncement: (payload: AnnouncementCreatePayload) => Promise<AnnouncementDetailsProps>;
}


export default class AnnouncementsAPIService extends AxiosAPI implements AnnouncementsAPI {
    private static _instance: AnnouncementsAPIService;

    constructor() {
        super({ resourcePath: '/api/v1/announcements' });
        if (AnnouncementsAPIService._instance) {
            return AnnouncementsAPIService._instance;
        }
        AnnouncementsAPIService._instance = this;
    }

    async getAnnouncements(payload: AnnouncementGetPayload) {
        try {
            const params = new URLSearchParams();

            params.append("offset", String(payload.offset));
            params.append("limit", String(payload.limit));

            if (payload.search?.trim()) {
                params.append("search", payload.search.trim());
            }

            if (payload.sort?.trim()) {
                params.append("sort", payload.sort.trim());
            }

            if (payload.cityMunId?.trim()) {
                params.append("cityMunId", payload.cityMunId.trim());
            }

            if (payload.mine !== undefined) {
                params.append("mine", String(payload.mine));
            }

            const response = await this.get({
                path: `?${params.toString()}`
            });

            return response;
        } catch (error) {
            console.error("Failed to fetch announcements", error);
            throw error;
        }
    }

    async getAnnouncementDetails(announcementId: string) {
        try {
            const response = await this.get({ path: `/${announcementId}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch announcement details", error);
            throw error;
        }
    }

    async updateAnnouncement(announcementId: string, payload: FormData | AnnouncementCreatePayload) {
        try {
            const isFormData = payload instanceof FormData;

            const response = await this.put({
                path: `/${announcementId}`,
                body: payload,
                headers: isFormData ? {} : { "Content-Type": "application/json" },
            });

            return response;
        } catch (error) {
            console.error("Failed to update announcement", error);
            throw error;
        }
    }

    async deleteAnnouncement(announcementId: string) {
        try {
            const response = await this.delete({ path: `/${announcementId}` });
            return response;
        } catch (error) {
            console.error("Failed to delete announcement", error);
            throw error;
        }
    }

    async createAnnouncement(payload: FormData | AnnouncementCreatePayload) {
        try {
            const isFormData = payload instanceof FormData;

            const response = await this.post({
            path: `/`,
            body: payload,
            headers: isFormData ? {} : { "Content-Type": "application/json" },
            });

            return response;
        } catch (error) {
            console.error("Failed to create announcement", error);
            throw error;
        }
    }

}