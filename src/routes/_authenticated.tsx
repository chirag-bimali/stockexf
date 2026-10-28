import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isSessionExpired, useAuthStore } from "@shared/auth";
import { ensureMe } from "@features/authorization";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const { session, signOut } = useAuthStore.getState();

    if (!session) {
      throw redirect({
        to: "/signin",
        search: { redirect: location.href },
      });
    }

    if (isSessionExpired(session)) {
      signOut();
      throw redirect({
        to: "/signin",
        search: { redirect: location.href },
      });
    }

    await ensureMe(session.user.id);
  },
  component: Outlet,
});
