export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details: Record<string, string[]>;
  rowErrors?: Record<string, Record<string, string[]>>;
}
