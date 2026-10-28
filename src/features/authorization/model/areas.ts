import type { LinkProps } from "@tanstack/react-router";
import { PERMISSIONS, type Permission } from "./permissions";

export type AreaPath = "/admin" | "/trader";

export type Area = {
  key: "admin" | "trader";
  label: string;
  to: LinkProps["to"];
  permission: Permission;
};

// Order matters: the first area a user can enter is their landing area.
export const AREAS: readonly Area[] = [
  {
    key: "admin",
    label: "Admin",
    to: "/admin",
    permission: PERMISSIONS.AdminAccess,
  },
  {
    key: "trader",
    label: "Trader",
    to: "/trader",
    permission: PERMISSIONS.TraderAccess,
  },
];

export function getAccessibleAreas(granted: readonly string[]): Area[] {
  return AREAS.filter((area) => granted.includes(area.permission));
}

export function getLandingPath(granted: readonly string[]): Area["to"] | null {
  return getAccessibleAreas(granted)[0]?.to ?? null;
}
