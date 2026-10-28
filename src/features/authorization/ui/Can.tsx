import type { ReactNode } from "react";
import { usePermissions } from "../model/usePermissions";
import type { Permission } from "../model/permissions";

type CanProps = {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
};

export function Can({ permission, children, fallback = null }: CanProps) {
  const { can } = usePermissions();

  return can(permission) ? <>{children}</> : <>{fallback}</>;
}
