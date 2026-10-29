import { Icon } from "./Icons";
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
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-meta font-medium text-brand-700">
              1,284 users
            </span>
          </div>
          <p className="text-sm leading-[21px] text-muted">
            Manage administrative and customer exchange accounts, security
            status, and permission roles.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            title="Export dataset to CSV"
            className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-card px-3.5 text-sm font-medium text-text-soft shadow-theme-xs transition-all hover:bg-surface hover:text-text active:scale-[0.99]"
          >
            <Icon name="download" className="h-[18px] w-[18px] text-muted" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs transition-all hover:bg-brand-600 active:translate-y-px"
          >
            <Icon name="person_add" className="h-[19px] w-[19px]" />
            <span>+ Add User</span>
          </button>
        </div>
      </div>

      <UsersPanel />
    </div>
  );
}
