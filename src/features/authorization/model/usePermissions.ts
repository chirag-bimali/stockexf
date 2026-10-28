import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@shared/auth";
import { meQueryOptions } from "./me.queries";
import { hasAllPermissions, hasAnyPermission, hasPermission } from "./can";
import type { Permission } from "./permissions";

const NONE: readonly string[] = [];

export function usePermissions() {
  const userId = useAuth()?.user.id ?? "";

  const { data, isPending } = useQuery({
    ...meQueryOptions(userId),
    enabled: userId !== "",
  });

  const granted = data?.permissions ?? NONE;

  return {
    isLoading: isPending,
    can: (p: Permission) => hasPermission(granted, p),
    canAny: (p: readonly Permission[]) => hasAnyPermission(granted, p),
    canAll: (p: readonly Permission[]) => hasAllPermissions(granted, p),
  };
}
