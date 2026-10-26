import type { ApiError as ApiErrorBody } from "./types";

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: Record<string, string[]>;
  readonly rowErrors?: Record<string, Record<string, string[]>>;

  constructor(
    message: string,
    options: {
      status: number;
      code: string;
      details?: Record<string, string[]>;
      rowErrors?: Record<string, Record<string, string[]>>;
    },
  ) {
    super(message);

    this.name = "ApiClientError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
    this.rowErrors = options.rowErrors;
  }

  static fromResponse(status: number, error?: ApiErrorBody): ApiClientError {
    return new ApiClientError(error?.message ?? getFallbackMessage(status), {
      status,
      code: error?.code ?? `HTTP.${status}`,
      details: error?.details,
      rowErrors: error?.rowErrors,
    });
  }
}

function getFallbackMessage(status: number): string {
  if (status === 401) return "Please sign in to continue.";
  if (status === 403) return "You do not have permission to do this.";
  if (status === 404) return "The requested resource was not found.";
  if (status === 409) return "This request conflicts with existing data.";
  if (status === 429) return "Too many requests. Please try again later.";
  if (status >= 500) return "Something went wrong. Please try again.";

  return "The request could not be completed.";
}
