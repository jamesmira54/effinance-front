import { BrgyProps, CityMunProps, ProvinceProps, RegionProps } from "@/screens/setup-manager/school/School.types";
import AxiosAPI from "./axios-api";

interface AddressAPI {
    getAllRegions: () => Promise<RegionProps[]>;
    getAllProvinces: () => Promise<ProvinceProps[]>;
    getAllCities: () => Promise<CityMunProps[]>;
    getAllBarangays: () => Promise<BrgyProps[]>;
}

export default class AddressAPIService extends AxiosAPI implements AddressAPI {
    private static _instance: AddressAPIService;

    constructor() {
        super({ resourcePath: "/api/v1/address" });
        if (AddressAPIService._instance) {
            return AddressAPIService._instance;
        }
        AddressAPIService._instance = this;
    }

    async getAllRegions() {
        try {
            const response = await this.get({ path: "/regions" });
            return response;
        } catch (error) {
            console.error("Failed to fetch all regions", error);
            throw error;
        }
    }

    async getAllProvinces() {
        try {
            const response = await this.get({ path: "/provinces" });
            return response;
        } catch (error) {
            console.error("Failed to fetch all provinces", error);
            throw error;
        }
    }

    async getAllCities(provinceCode?: string) {
        try {
            const query = provinceCode ? `?provinceCode=${encodeURIComponent(provinceCode)}` : "";
            const response = await this.get({ path: `/citymuns${query}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch all cities", error);
            throw error;
        }
    }

    async getAllBarangays(citymunCode?: string) {
        try {
            const query = citymunCode ? `?citymunCode=${encodeURIComponent(citymunCode)}` : "";
            const response = await this.get({ path: `/barangays${query}` });
            return response;
        } catch (error) {
            console.error("Failed to fetch all barangays", error);
            throw error;
        }
    }
}