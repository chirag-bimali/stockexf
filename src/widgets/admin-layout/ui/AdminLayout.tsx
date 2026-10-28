import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@shared/auth";
import { useSignOut } from "@features/auth";
import { AreaSwitcher, usePermissions } from "@features/authorization";
import { ADMIN_NAV_ITEMS } from "../model/nav-items";

export function AdminLayout({ children }: { children: ReactNode }) {
  const session = useAuth();
  const signOut = useSignOut();
  const { can } = usePermissions();

  const items = ADMIN_NAV_ITEMS.filter(
    (i) => !i.permission || can(i.permission),
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r p-4">
        <p className="mb-4 text-sm font-semibold">Stockex Admin</p>
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeOptions={{ exact: item.to === "/admin" }}
              className="rounded px-3 py-2 text-sm hover:bg-black/5"
              activeProps={{ className: "font-semibold bg-black/5" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-6 py-3 text-sm">
          <span>{session?.user.roles.join(", ")}</span>
          <div className="flex items-center gap-3">
            <AreaSwitcher />
            <span>{session?.user.email}</span>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
