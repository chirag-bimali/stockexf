// All VITE_ vars come from import.meta.env
// We validate them at startup so the app crashes early
// with a clear message instead of silently failing later
type EnvKey = "VITE_API_BASE_URL" | "VITE_ENV" | "VITE_ENABLE_MOCKS";

const getEnvVar = (key: EnvKey, fallback?: string): string => {
  const value = import.meta.env[key] || fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL"),
  ENV: getEnvVar("VITE_ENV") as ImportMetaEnv["VITE_ENV"],
  ENABLE_MOCKS: getEnvVar("VITE_ENABLE_MOCKS", "false") === "true",
} as const;
