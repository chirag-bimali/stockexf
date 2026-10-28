import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@shared/auth";
import { useSignOut } from "@features/auth";
import { AreaSwitcher, usePermissions } from "@features/authorization";
import { TRADER_NAV_ITEMS } from "../model/nav-items";

export function TraderLayout({ children }: { children: ReactNode }) {
  const session = useAuth();
  const signOut = useSignOut();
  const { can } = usePermissions();

  const items = TRADER_NAV_ITEMS.filter(
    (i) => !i.permission || can(i.permission),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-3 text-sm">
        <div className="flex items-center gap-6">
          <span className="font-semibold">Stockex</span>
          <nav className="flex gap-4">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.to === "/trader" }}
                className="hover:underline"
                activeProps={{ className: "font-semibold underline" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

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
  );
}
