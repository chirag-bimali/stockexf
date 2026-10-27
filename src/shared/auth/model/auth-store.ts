import { create } from "zustand";
import { getUserFromToken } from "./jwt";
import {
  AUTH_STORAGE_KEY,
  clearStoredSession,
  isSessionExpired,
  readStoredSession,
  writeStoredSession,
} from "./storage";
import type { Session, SigninResult } from "./types";

export type AuthState = {
  session: Session | null;
  signIn: (result: SigninResult, remember: boolean) => void;
  signOut: () => void;
  hydrateFromStorage: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  session: readStoredSession(),

  signIn: (result: SigninResult, remember: boolean) => {
    const session: Session = {
      accessToken: result.accessToken,
      expiresAt: Date.parse(result.expiresAtUtc),
      user: getUserFromToken(result.accessToken),
    };

    if (Number.isNaN(session.expiresAt) || isSessionExpired(session)) {
      throw new Error("The server returned an expired session.");
    }

    writeStoredSession(session, remember);
    set({ session });
  },

  signOut: () => {
    clearStoredSession();
    set({ session: null });
  },

  hydrateFromStorage: () => {
    set({ session: readStoredSession() });
  },
}));

export function getAccessToken(): string | null {
  const { session, signOut } = useAuthStore.getState();

  if (!session) return null;

  if (isSessionExpired(session)) {
    signOut();
    return null;
  }

  return session.accessToken;
}

export function initAuthSync(): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === AUTH_STORAGE_KEY || event.key === null) {
      useAuthStore.getState().hydrateFromStorage();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("storage", onStorage);
  };
}
