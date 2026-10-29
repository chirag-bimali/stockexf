import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PERMISSIONS, requirePermission } from "@features/authorization";
import { AdminLayout } from "@pages/AdminLayout";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: () => requirePermission(PERMISSIONS.AdminAccess),
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
