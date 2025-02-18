import tokenService from "@/entities/token/libs/tokenService";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { RequestOptions } from "https";

export class AxiosClient {
  private baseQueryV1Instance: AxiosInstance;

  constructor(baseURL: string, withAuth = false) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const authConfig: AxiosRequestConfig = {
      baseURL: `${baseURL}/waInstance${tokenService.getAccessId()}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (withAuth) {
      this.baseQueryV1Instance = axios.create(authConfig);
    } else {
      this.baseQueryV1Instance = axios.create(config);
    }
  }

  public getInstance() {
    return this.baseQueryV1Instance;
  }

  private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    return response;
  }

  private handleError(error: AxiosError<{ message?: string }>): never {
    const message = error.response?.data?.message || error.message || "Error";
    throw new Error(message);
  }

  public async get<T>(
    url: string,
    params: Omit<RequestOptions, "body"> = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.get<T>(url, { params });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.post<T>(
        url,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.put<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.patch<T>(
        url,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.delete<T>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }
}
export const axiosAuth = new AxiosClient(
  import.meta.env.VITE_BASE_API_URL,
  true
);
export const axiosNoAuth = new AxiosClient(
  import.meta.env.VITE_BASE_API_URL,
  false
);
