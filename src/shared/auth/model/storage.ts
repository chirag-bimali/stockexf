import type { AuthUser, Session } from "./types";

export const AUTH_STORAGE_KEY = "stockex.auth.session";

const EXPIRY_SKEW_MS = 30_000;

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== "object" || value === null) return false;

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    Array.isArray(user.roles) &&
    user.roles.every((role) => typeof role === "string")
  );
}

function isSession(value: unknown): value is Session {
  if (typeof value !== "object" || value === null) return false;

  const session = value as Record<string, unknown>;

  return (
    typeof session.accessToken === "string" &&
    typeof session.expiresAt === "number" &&
    isAuthUser(session.user)
  );
}

function parseSession(raw: string | null): Session | null {
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(raw);

    if (!isSession(value)) return null;
    if (value.expiresAt <= Date.now() + EXPIRY_SKEW_MS) return null;

    return value;
  } catch {
    return null;
  }
}

export function isSessionExpired(session: Session): boolean {
  return session.expiresAt <= Date.now() + EXPIRY_SKEW_MS;
}

export function readStoredSession(): Session | null {
  if (typeof window === "undefined") return null;

  const session =
    parseSession(window.sessionStorage.getItem(AUTH_STORAGE_KEY)) ??
    parseSession(window.localStorage.getItem(AUTH_STORAGE_KEY));

  if (!session) {
    clearStoredSession();
  }

  return session;
}

export function writeStoredSession(session: Session, remember: boolean): void {
  if (typeof window === "undefined") return;

  clearStoredSession();

  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
