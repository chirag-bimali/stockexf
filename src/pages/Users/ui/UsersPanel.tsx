import { useState } from "react";
import { USERS } from "../model/users";
import { Icon } from "./Icons";
import { UserRow } from "./UserRow";

export function UsersPanel() {
  const [selected, setSelected] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const allSelected = USERS.every((user) => selected.has(user.email));

  const toggleUser = (email: string) => {
    setSelected((current) => {
      const next = new Set(current);

      if (next.has(email)) {
        next.delete(email);
      } else {
        next.add(email);
      }

      return next;
    });
  };

  const toggleAll = () => {
    setSelected(
      allSelected ? new Set<string>() : new Set(USERS.map((user) => user.email)),
    );
  };

  return (
    <div className="overflow-visible rounded-xl border border-line bg-card shadow-theme-xs">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col justify-between gap-3.5 rounded-t-xl bg-card p-4 md:p-5 xl:flex-row xl:items-center"
      >
        <div className="flex max-w-4xl flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-[240px] flex-1">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-2"
            />
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              aria-label="Search by name, email, or user ID"
              className="h-10 w-full rounded-lg border border-line bg-surface/50 pl-10 pr-3.5 text-sm text-text transition-all placeholder:text-muted-2 focus:border-brand-500 focus:bg-card focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="relative min-w-[140px]">
            <select
              defaultValue=""
              aria-label="Filter by role"
              className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface/50 pl-3 pr-8 text-sm text-text-soft transition-all focus:border-brand-500 focus:bg-card focus:outline-none"
            >
              <option value="">All Roles</option>
              <option value="system_admin">System Admin</option>
              <option value="exchange_officer">Exchange Officer</option>
              <option value="company_rep">Company Representative</option>
              <option value="investor">Investor</option>
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-2"
            />
          </div>

          <div className="relative min-w-[130px]">
            <select
              defaultValue=""
              aria-label="Filter by status"
              className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface/50 pl-3 pr-8 text-sm text-text-soft transition-all focus:border-brand-500 focus:bg-card focus:outline-none"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="locked">Locked</option>
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-2"
            />
          </div>

          <div className="relative min-w-[130px]">
            <select
              defaultValue=""
              aria-label="Filter by verification"
              className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface/50 pl-3 pr-8 text-sm text-text-soft transition-all focus:border-brand-500 focus:bg-card focus:outline-none"
            >
              <option value="">All Verification</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-2"
            />
          </div>

          <button
            type="reset"
            className="h-10 cursor-pointer self-center whitespace-nowrap px-3 text-xs font-medium text-muted transition-colors hover:text-text"
          >
            Clear Filters
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
            {selected.size} selected
          </span>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-y border-line bg-surface/70 text-xs font-semibold uppercase tracking-wider text-muted">
              <th className="w-12 px-4 py-3 text-center align-middle">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all users"
                  className="h-4 w-4 cursor-pointer rounded text-brand-500 accent-brand-500"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold align-middle">
                USER
              </th>
              <th className="px-4 py-3 text-left font-semibold align-middle">
                ROLE
              </th>
              <th className="px-4 py-3 text-left font-semibold align-middle">
                STATUS
              </th>
              <th className="px-4 py-3 text-left font-semibold align-middle">
                EMAIL VERIFIED
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold align-middle">
                ACTIVITY
              </th>
              <th className="px-4 py-3 text-right font-semibold align-middle">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {USERS.map((user, index) => (
              <UserRow
                key={user.email}
                user={user}
                selected={selected.has(user.email)}
                isLast={index === USERS.length - 1}
                onToggle={toggleUser}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-b-xl border-t border-line bg-card p-4 sm:flex-row md:px-6 md:py-3.5">
        <div className="flex items-center gap-4 text-xs text-muted">
          <span>
            Showing <strong className="font-medium text-text">1 to 6</strong>{" "}
            of <strong className="font-medium text-text">1,284</strong> users
          </span>
          <div className="hidden h-3.5 w-px bg-line sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-muted-2">Rows:</span>
            <select
              defaultValue="6"
              aria-label="Rows per page"
              className="h-8 cursor-pointer rounded-lg border border-line bg-card px-2 text-xs text-text-soft focus:outline-none"
            >
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-8 cursor-not-allowed items-center gap-1 rounded-lg border border-line bg-card px-2.5 text-xs font-medium text-muted-2"
          >
            <Icon name="chevron_left" className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1 px-1">
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-brand-500 text-xs font-semibold text-white shadow-theme-xs"
            >
              1
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-lg text-xs font-medium text-text-soft transition-colors hover:bg-surface-2"
            >
              2
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-lg text-xs font-medium text-text-soft transition-colors hover:bg-surface-2"
            >
              3
            </button>
            <span className="px-1 text-xs text-muted-2">...</span>
            <button
              type="button"
              className="h-8 w-8 rounded-lg text-xs font-medium text-text-soft transition-colors hover:bg-surface-2"
            >
              214
            </button>
          </div>

          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-lg border border-line bg-card px-2.5 text-xs font-medium text-text-soft shadow-theme-xs transition-colors hover:bg-surface"
          >
            <span>Next</span>
            <Icon name="chevron_right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
