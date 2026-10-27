import { useAuthStore } from "./auth-store";
import type { Session } from "./types";

export function useAuth(): Session | null {
  return useAuthStore((state) => state.session);
}

export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.session !== null);
}
