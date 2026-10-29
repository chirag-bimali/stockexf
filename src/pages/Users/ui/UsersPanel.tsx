import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@shared/auth";
import { usersQueryOptions } from "../model/users.queries";
import type { GetUsersParams } from "../model/users";
import { Icon } from "./Icons";
import { UserRow } from "./UserRow";

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

type UsersPanelProps = {
  onTotalCountChange: (totalCount: number | null) => void;
};

export function UsersPanel({ onTotalCountChange }: UsersPanelProps) {
  const session = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  const params = useMemo<GetUsersParams>(
    () => ({
      pageNumber,
      pageSize,
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(role ? { role } : {}),
      ...(activeFilter ? { isActive: activeFilter === "active" } : {}),
      ...(verifiedFilter
        ? { isEmailVerified: verifiedFilter === "verified" }
        : {}),
    }),
    [activeFilter, pageNumber, pageSize, role, search, verifiedFilter],
  );
  const usersQuery = useQuery(usersQueryOptions(params));
  const users = usersQuery.data?.items ?? [];
  const totalPages = usersQuery.data?.totalPages ?? 0;

  useEffect(() => {
    onTotalCountChange(usersQuery.data?.totalCount ?? null);
  }, [onTotalCountChange, usersQuery.data?.totalCount]);
  const allSelected =
    users.length > 0 && users.every((user) => selected.has(user.email));

  const resetPage = () => setPageNumber(1);
  const clearFilters = () => {
    setSearch("");
    setRole("");
    setActiveFilter("");
    setVerifiedFilter("");
    resetPage();
  };
  const toggleUser = (email: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  };
  const toggleAll = () => {
    setSelected((current) => {
      const next = new Set(current);
      if (allSelected) users.forEach((user) => next.delete(user.email));
      else users.forEach((user) => next.add(user.email));
      return next;
    });
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
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
              placeholder="Search by name or email..."
              aria-label="Search by name or email"
              className="h-10 w-full rounded-lg border border-line bg-surface/50 pl-10 pr-3.5 text-sm text-text transition-all placeholder:text-muted-2 focus:border-brand-500 focus:bg-card focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              resetPage();
            }}
            aria-label="Filter by role"
            className="h-10 min-w-[140px] cursor-pointer rounded-lg border border-line bg-surface/50 px-3 text-sm text-text-soft focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="system_admin">System Admin</option>
            <option value="exchange_officer">Exchange Officer</option>
            <option value="company_rep">Company Representative</option>
            <option value="investor">Investor</option>
          </select>
          <select
            value={activeFilter}
            onChange={(event) => {
              setActiveFilter(event.target.value);
              resetPage();
            }}
            aria-label="Filter by status"
            className="h-10 min-w-[130px] cursor-pointer rounded-lg border border-line bg-surface/50 px-3 text-sm text-text-soft focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={verifiedFilter}
            onChange={(event) => {
              setVerifiedFilter(event.target.value);
              resetPage();
            }}
            aria-label="Filter by verification"
            className="h-10 min-w-[130px] cursor-pointer rounded-lg border border-line bg-surface/50 px-3 text-sm text-text-soft focus:border-brand-500 focus:outline-none"
          >
            <option value="">All Verification</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="h-10 cursor-pointer self-center whitespace-nowrap px-3 text-xs font-medium text-muted transition-colors hover:text-text"
          >
            Clear Filters
          </button>
        </div>
        <span className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
          {selected.size} selected
        </span>
      </form>

      {usersQuery.isPending ? (
        <div className="border-y border-line p-10 text-center text-sm text-muted">
          Loading users...
        </div>
      ) : usersQuery.isError ? (
        <div className="border-y border-line p-10 text-center text-sm text-error-600">
          Unable to load users. Try again.
        </div>
      ) : users.length === 0 ? (
        <div className="border-y border-line p-10 text-center text-sm text-muted">
          No users match the selected filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y border-line bg-surface/70 text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="w-12 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all users"
                    className="h-4 w-4 cursor-pointer accent-brand-500"
                  />
                </th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Email verified</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user, index) => (
                <UserRow
                  key={user.id}
                  user={user}
                  selected={selected.has(user.email)}
                  isLast={index === users.length - 1}
                  onToggle={toggleUser}
                  currentUserId={session?.user.id ?? ""}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-4 rounded-b-xl border-t border-line bg-card p-4 sm:flex-row md:px-6 md:py-3.5">
        <div className="flex items-center gap-4 text-xs text-muted">
          <span>
            Showing{" "}
            <strong className="font-medium text-text">
              {users.length === 0 ? 0 : (pageNumber - 1) * pageSize + 1} to{" "}
              {(pageNumber - 1) * pageSize + users.length}
            </strong>{" "}
            of{" "}
            <strong className="font-medium text-text">
              {usersQuery.data?.totalCount ?? 0}
            </strong>{" "}
            users
          </span>
          <label className="flex items-center gap-1.5">
            <span className="text-muted-2">Rows:</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                resetPage();
              }}
              aria-label="Rows per page"
              className="h-8 cursor-pointer rounded-lg border border-line bg-card px-2 text-xs text-text-soft"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((page) => page - 1)}
            className="flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-xs font-medium text-text-soft disabled:cursor-not-allowed disabled:text-muted-2"
          >
            <Icon name="chevron_left" className="h-4 w-4" />
            Previous
          </button>
          <span className="px-2 text-xs text-muted">
            Page {pageNumber} of {totalPages || 1}
          </span>
          <button
            type="button"
            disabled={pageNumber >= totalPages}
            onClick={() => setPageNumber((page) => page + 1)}
            className="flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-xs font-medium text-text-soft disabled:cursor-not-allowed disabled:text-muted-2"
          >
            Next
            <Icon name="chevron_right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
