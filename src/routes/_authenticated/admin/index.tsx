import { createFileRoute } from "@tanstack/react-router";
import { Can, PERMISSIONS } from "@features/authorization";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div>
      <h3 className="text-lg font-semibold">Admin dashboard</h3>

      <Can
        permission={PERMISSIONS.UsersCreate}
        fallback={
          <p className="mt-4 text-sm text-gray-500">
            You do not have permission to create users.
          </p>
        }
      >
        <button type="button" className="mt-4 rounded border px-3 py-2 text-sm">
          Create user
        </button>
      </Can>

      {/* <button type="button" className="mt-4 rounded border px-3 py-2 text-sm">
        Create user
      </button> */}
    </div>
  );
}
