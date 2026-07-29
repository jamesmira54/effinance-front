import AxiosAPI from "./axios-api";
import { PublicAnnouncementsListResponse } from "@/types/annoucements.types";

export default class PublicAnnouncementsAPIService extends AxiosAPI {
    constructor() {
        super({ resourcePath: "/api/v1/public/announcements" });
    }

    async getAnnouncements(): Promise<PublicAnnouncementsListResponse> {
        try {
            return await this.get({});
        } catch (error) {
            console.error("Failed to fetch public announcements", error);
            throw error;
        }
    }
}
