import { Link } from "@tanstack/react-router";
import logo from "../../../assets/logo.png";
import type { NavItem } from "../model/nav-items";
import { Icon } from "./Icons";

export function AdminSidebar({ items }: { items: readonly NavItem[] }) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-sidebar flex-col justify-between border-r border-line bg-card">
      <div>
        <div className="flex h-header items-center justify-between border-b border-line-soft px-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Stockex logo"
              className="h-9 w-9 rounded-xl object-contain shadow-theme-sm shadow-brand-500/20"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold leading-none tracking-tight text-text">
                Stockex
              </span>
              <span className="mt-0.5 text-[11px] font-medium tracking-wide text-muted-2">
                Admin
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-2 pt-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-2">
            MENU
          </span>
        </div>

        <nav className="space-y-1 px-4">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeOptions={{ exact: item.to === "/admin" }}
              className="group relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-medium transition-colors"
              inactiveProps={{
                className: "text-text-soft hover:bg-surface hover:text-text",
              }}
              activeProps={{
                className:
                  "bg-brand-50 text-brand-600 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-[3px] before:rounded-r before:bg-brand-500 before:content-['']",
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    name={item.icon}
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      isActive
                        ? "text-brand-600"
                        : "text-muted-2 group-hover:text-text-soft"
                    }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
