import type { LinkProps } from "@tanstack/react-router";
import { PERMISSIONS, type Permission } from "@features/authorization";

export type NavIcon = "grid_view" | "users";

export type NavItem = {
  label: string;
  to: LinkProps["to"];
  icon: NavIcon;
  permission?: Permission;
};

export const ADMIN_NAV_ITEMS: readonly NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: "grid_view" },
  {
    label: "Users",
    to: "/admin/user",
    icon: "users",
    permission: PERMISSIONS.UsersRead,
  },
];
