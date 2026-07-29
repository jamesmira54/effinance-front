import AxiosAPI from "./axios-api";
import { PublicSponsorshipListResponse } from "@/types/sponsorship.types";

export default class PublicSponsorshipAPIService extends AxiosAPI {
    constructor() {
        super({ resourcePath: "/api/v1/public/sponsorships" });
    }

    async getSponsorships(): Promise<PublicSponsorshipListResponse> {
        try {
            return await this.get({});
        } catch (error) {
            console.error("Failed to fetch public sponsorships", error);
            throw error;
        }
    }
}
