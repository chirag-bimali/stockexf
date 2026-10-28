import { redirect } from "@tanstack/react-router";
import { queryClient } from "@shared/lib/query-client";
import { useAuthStore } from "@shared/auth";
import { meQueryOptions } from "./me.queries";
import { hasPermission } from "./can";
import type { Permission } from "./permissions";
import type { Me } from "./types";
import { getLandingPath } from "./areas";

// Loads /me into the cache (or reuses it). Used by route beforeLoad functions.
export function ensureMe(userId: string): Promise<Me> {
  return queryClient.query({
    ...meQueryOptions(userId),
  });
}

// Use inside a route's beforeLoad:
//   beforeLoad: () => requirePermission(PERMISSIONS.UsersRead)
export async function requirePermission(required: Permission): Promise<void> {
  const session = useAuthStore.getState().session;

  if (!session) {
    throw redirect({ to: "/signin" });
  }

  const me = await ensureMe(session.user.id);

  if (!hasPermission(me.permissions, required)) {
    throw redirect({ to: "/" });
  }
}
// Used by the "/" route: send the user to the first area they may enter.
export async function redirectToLandingArea(): Promise<never> {
  const session = useAuthStore.getState().session;

  if (!session) {
    throw redirect({ to: "/signin" });
  }

  const me = await ensureMe(session.user.id);
  const landing = getLandingPath(me.permissions);

  throw redirect({ to: landing ?? "/" });
}
