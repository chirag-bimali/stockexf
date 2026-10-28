import type { LinkProps } from "@tanstack/react-router";
import { PERMISSIONS, type Permission } from "@features/authorization";

export type NavItem = {
  label: string;
  to: LinkProps["to"];
  permission?: Permission;
};

export const ADMIN_NAV_ITEMS: readonly NavItem[] = [
  { label: "Dashboard", to: "/admin" },
  { label: "Users", to: "/admin", permission: PERMISSIONS.UsersRead },
];
