import { UsersPanel } from "./UsersPanel";

export function UsersPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-3 pt-0.5">
            <h1 className="text-2xl font-semibold tracking-tight text-text">
              Users
            </h1>
          </div>
          <p className="text-sm leading-[21px] text-muted">
            Manage administrative and customer exchange accounts, security
            status, and permission roles.
          </p>
        </div>

      </div>

      <UsersPanel />
    </div>
  );
}
