import { createFileRoute } from "@tanstack/react-router";
import { PERMISSIONS, requirePermission } from "@features/authorization";

export const Route = createFileRoute("/_authenticated/admin/user")({
  beforeLoad: () => requirePermission(PERMISSIONS.UsersRead),
  component: () => <h3 className="text-lg font-semibold">Users page</h3>,
});
