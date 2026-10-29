import { jwtDecode } from "jwt-decode";
import type { AuthUser } from "./types";

type JwtPayload = {
  sub?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  role?: string | string[];
}

export function getUserFromToken(token: string): AuthUser {
  const payload = jwtDecode<JwtPayload>(token);
  const role = payload.role;
  const roles = Array.isArray(role) ? role : role ? [role] : [];

  if (
    !payload.sub ||
    !payload.email ||
    !payload.given_name ||
    !payload.family_name ||
    roles.length === 0
  ) {
    throw new Error("The server returned an incomplete authenticated user.");
  }

  return {
    id: payload.sub,
    email: payload.email,
    firstName: payload.given_name,
    lastName: payload.family_name,
    roles,
  };
}
