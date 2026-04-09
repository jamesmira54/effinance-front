import { DashboardData } from "@/components/Dashboard/dashboard.types";
import AxiosAPI from "./axios-api";

interface DashboardAPI {
    dashboardData(): Promise<DashboardData>;
}


export default class DashboardAPIService extends AxiosAPI implements DashboardAPI {
    private static _instance: DashboardAPIService;

    constructor() {
        super({ resourcePath: "/api/v1/dashboard" });
        if (DashboardAPIService._instance) {
            return DashboardAPIService._instance;
        }
        DashboardAPIService._instance = this;
    }

    async dashboardData(): Promise<DashboardData> {
        try {
            const response: DashboardData = await this.get({ path: "/enhanced" });
            return response;
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
            throw error;
        }
    }
}
            