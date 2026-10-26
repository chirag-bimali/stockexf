import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { ApiClientError } from "@shared/api";
import type { ApiResponse } from "@shared/api";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
  },
});

// Runs before every request.
function onRequest(config: InternalAxiosRequestConfig) {
  return config;
}

// Runs when Axios receives an HTTP error or cannot complete a request.
function onResponseError(error: AxiosError) {
  if (error.response) {
    const body: unknown = error.response.data;

    const apiError = isApiResponse(body) ? body.error : undefined;

    return Promise.reject(
      ApiClientError.fromResponse(error.response.status, apiError),
    );
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return Promise.reject(
      new ApiClientError("The request timed out. Please try again.", {
        status: 0,
        code: "Network.Timeout",
      }),
    );
  }

  return Promise.reject(
    new ApiClientError("Unable to connect to the server. Please try again.", {
      status: 0,
      code: "Network.Error",
    }),
  );
}

function isApiResponse(value: unknown): value is ApiResponse<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    typeof value.success === "boolean"
  );
}

http.interceptors.request.use(onRequest);

http.interceptors.response.use((response) => response, onResponseError);

export default http;
