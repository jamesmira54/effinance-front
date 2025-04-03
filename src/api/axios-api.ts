import Axios, {
    AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from "axios";

import { getAuthToken } from "@/utils/helpers";


/**
 * Interface for request options.
 */
export interface RequestOptions {
    path?: string;
    params?: any;
    headers?: any;
}

/**
 * Interface for request options with a request body.
 */
export interface RequestOptionsWithBody extends RequestOptions {
    body?: any;
}

export type AxiosAPIConstructor = {
    resourcePath?: string;
    baseUrl?: string;
};

/**
 * AxiosAPI provides methods for making HTTP requests using Axios.
 */
export default class AxiosAPI {
    protected resourcePath: string;
    protected baseUrl: string;
    protected api!: AxiosInstance;
  
    constructor({ resourcePath, baseUrl }: AxiosAPIConstructor) {
      this.resourcePath = resourcePath || "";
      this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL!;
  
      // Create an Axios instance with a base URL and default headers
      this.api = Axios.create({
        baseURL: `${this.baseUrl}${this.resourcePath}`,
      });
  
      // Attach an interceptor to inject the authentication token into requests
      this.api.interceptors.request.use(async (config) => {
        const accessToken = await getAuthToken();
        if (accessToken) {
          config.headers = new AxiosHeaders({
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          });
        }
        return config;
      });
    }
  
    /**
     * A generic request handler to handle all HTTP methods.
     * @param method - The HTTP method (GET, POST, PUT, PATCH, DELETE)
     * @param options - Request options including path, params, headers, body, and signal
     */
    private async _request<T>(
      method: "get" | "post" | "put" | "patch" | "delete",
      {
        path = "",
        params = {},
        headers = {},
        body = {}
      }: RequestOptionsWithBody
    ): Promise<T> {
      const config: AxiosRequestConfig = {
        headers: headers as AxiosHeaders,
        params,
      };
  
      // Handle GET and DELETE requests without a request body
      const response: AxiosResponse<{ data: T }> =
        method === "get" || method === "delete"
          ? await this.api[method](path, config)
          : await this.api[method](path, body, config);
  
      return response?.data?.data;
    }
  
    /**
     * Sends a GET request.
     */
    async get<T>(options: RequestOptions): Promise<any> {
      return this._request<T>("get", options);
    }
  
    /**
     * Sends a POST request.
     */
    async post<T>(options: RequestOptionsWithBody): Promise<any> {
      return this._request<T>("post", options);
    }
  
    /**
     * Sends a PUT request.
     */
    async put<T>(options: RequestOptionsWithBody): Promise<any> {
      return this._request<T>("put", options);
    }
  
    /**
     * Sends a PATCH request.
     */
    async patch<T>(options: RequestOptionsWithBody): Promise<any> {
      return this._request<T>("patch", options);
    }
  
    /**
     * Sends a DELETE request.
     */
    async delete<T>(options: RequestOptions): Promise<any> {
      return this._request<T>("delete", options);
    }
  
  }
  