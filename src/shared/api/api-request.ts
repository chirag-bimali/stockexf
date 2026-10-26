import type { AxiosRequestConfig } from "axios";
import http from "@shared/lib/http";
import { ApiClientError } from "./api-error";
import type { ApiResponse } from "./types";

async function apiRequest<T>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  const response = await http.request<unknown>({
    ...config,
    url: path,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = response.data;

  if (
    typeof body !== "object" ||
    body === null ||
    !("success" in body) ||
    typeof body.success !== "boolean"
  ) {
    throw new ApiClientError("The server returned an unexpected response.", {
      status: response.status,
      code: "Response.Invalid",
    });
  }

  const apiResponse = body as ApiResponse<T>;

  if (apiResponse.success === false) {
    throw ApiClientError.fromResponse(response.status, apiResponse.error);
  }

  if (!("data" in apiResponse)) {
    throw new ApiClientError("The server response is missing data.", {
      status: response.status,
      code: "Response.Invalid",
    });
  }

  return apiResponse.data as T;
}

export const api = {
  get: <T>(path: string, config?: AxiosRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "GET" }),

  post: <T>(path: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "POST", data }),

  put: <T>(path: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "PUT", data }),

  patch: <T>(path: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "PATCH", data }),

  delete: <T>(path: string, config?: AxiosRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "DELETE" }),
};
