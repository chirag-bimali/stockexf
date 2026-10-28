import type { LinkProps } from "@tanstack/react-router";
import type { Permission } from "@features/authorization";

export type NavItem = {
  label: string;
  to: LinkProps["to"];
  permission?: Permission;
};

export const TRADER_NAV_ITEMS: readonly NavItem[] = [
  { label: "Overview", to: "/trader" },
];
