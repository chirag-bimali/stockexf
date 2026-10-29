import { useEffect, useRef, useState } from "react";
import { useAuth } from "@shared/auth";
import { useSignOut } from "@features/auth";
import { AREAS, AreaSwitcher, usePermissions } from "@features/authorization";
import { getInitials } from "../model/user-display";
import { Icon } from "./Icons";

export function UserMenu() {
  const session = useAuth();
  const signOut = useSignOut();
  const { can } = usePermissions();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!session) return null;

  const email = session.user.email;
  const displayName = `${session.user.firstName} ${session.user.lastName}`.trim();
  const initials = getInitials(displayName);
  const roleLabel = session.user.roles[0];
  if (!roleLabel) {
    throw new Error("The authenticated user has no assigned role.");
  }
  const canSwitchAreas = AREAS.filter((area) => can(area.permission)).length > 1;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="group flex cursor-pointer items-center gap-2.5 rounded-xl border border-transparent p-1.5 transition-colors hover:border-line hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/20"
      >
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-brand-50 text-sm font-semibold text-brand-600 shadow-theme-xs">
            {initials}
          </div>
        </div>
        <div className="hidden flex-col pr-0.5 text-left md:flex">
          <span className="text-sm font-medium leading-tight text-text">
            {displayName}
          </span>
          <span className="mt-0.5 text-xs leading-tight text-muted">
            {roleLabel}
          </span>
        </div>
        <Icon
          name="keyboard_arrow_down"
          className={`ml-0.5 hidden h-[18px] w-[18px] text-muted-2 transition-transform duration-200 group-hover:text-text-soft md:inline-block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-card shadow-theme-lg">
          <div className="border-b border-line-soft px-4 py-3">
            <p className="truncate text-sm font-semibold text-text">
              {displayName}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">{email}</p>
            <p className="mt-1 text-xs font-medium text-brand-600">
              {roleLabel}
            </p>
          </div>

          {canSwitchAreas && (
            <div className="border-b border-line-soft p-2">
              <AreaSwitcher />
            </div>
          )}

          <div className="p-1.5">
            <button
              type="button"
              onClick={signOut}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-error-600 transition-colors hover:bg-error-50"
            >
              <Icon name="logout" className="h-[18px] w-[18px]" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
