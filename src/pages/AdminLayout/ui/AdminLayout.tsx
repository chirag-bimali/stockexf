import type { ReactNode } from "react";
import { usePermissions } from "@features/authorization";
import { ADMIN_NAV_ITEMS } from "../model/nav-items";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { can } = usePermissions();

  const items = ADMIN_NAV_ITEMS.filter(
    (i) => !i.permission || can(i.permission),
  );

  return (
    <div className="min-h-screen bg-background antialiased">
      <AdminSidebar items={items} />

      <div className="flex min-h-screen flex-col xl:ml-sidebar">
        <AdminHeader />
        <main className="w-full flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
