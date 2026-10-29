import { createFileRoute } from "@tanstack/react-router";
import { PERMISSIONS, requirePermission } from "@features/authorization";
import { UsersPage } from "@pages/Users";

export const Route = createFileRoute("/_authenticated/admin/user")({
  beforeLoad: () => requirePermission(PERMISSIONS.UsersRead),
  component: UsersPage,
});
