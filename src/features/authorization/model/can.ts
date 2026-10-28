import type { Permission } from "./permissions";

export function hasPermission(
  granted: readonly string[],
  required: Permission,
): boolean {
  return granted.includes(required);
}

export function hasAnyPermission(
  granted: readonly string[],
  required: readonly Permission[],
): boolean {
  return required.some((p) => granted.includes(p));
}

export function hasAllPermissions(
  granted: readonly string[],
  required: readonly Permission[],
): boolean {
  return required.every((p) => granted.includes(p));
}
