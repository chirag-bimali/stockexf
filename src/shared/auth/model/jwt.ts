import { jwtDecode } from "jwt-decode";
import type { AuthUser } from "./types";

type JwtPayload = {
  sub?: string;
  email?: string;
  role?: string | string[];
};

export function getUserFromToken(token: string): AuthUser {
  const payload = jwtDecode<JwtPayload>(token);
  const role = payload.role;

  return {
    id: payload.sub ?? "",
    email: payload.email ?? "",
    roles: Array.isArray(role) ? role : role ? [role] : [],
  };
}
