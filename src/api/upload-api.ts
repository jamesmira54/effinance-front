import { APIFileUploadPayload } from "@/types";
import AxiosAPI from "./axios-api";

interface UploadAPI {
    uploadFile: (payload: APIFileUploadPayload) => Promise<any>;
    deleteFile: (fileId: string) => Promise<any>;
}

export default class UploadAPIService extends AxiosAPI implements UploadAPI {

    private static _instance: UploadAPIService;
    constructor() {
        super({ resourcePath: "/api/v1/file-uploads" });
        if (UploadAPIService._instance) {
            return UploadAPIService._instance;
        }
        UploadAPIService._instance = this;
    }

    async getAllFileTypes() {
        try {
            const response = await this.get({ path: "/file-type" });
            return response;
        } catch (error) {
            console.error("Failed to fetch all file types", error);
        }
    }

    async uploadFile(payload: APIFileUploadPayload) {
        try {
            const formData = new FormData();
            formData.append("applicationForm", payload.applicationForm);
            formData.append("fileTypeId", payload.fileTypeId);
            const response = await this.post({ path: `/${payload.studentId}`, body: formData });
            return response;
        } catch (error) {
            console.error("Failed to upload file", error);
            throw error;
        }
    }

    async deleteFile(fileId: string) {
        try {
            const response = await this.delete({ path: `/${fileId}` });
            return response;
        } catch (error) {
            console.error("Failed to delete file", error);
            throw error;
        }
    }
}