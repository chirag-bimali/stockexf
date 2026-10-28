import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PERMISSIONS, requirePermission } from "@features/authorization";
import { TraderLayout } from "@widgets/trader-layout";

export const Route = createFileRoute("/_authenticated/trader")({
  beforeLoad: () => requirePermission(PERMISSIONS.TraderAccess),
  component: () => (
    <TraderLayout>
      <Outlet />
    </TraderLayout>
  ),
});
