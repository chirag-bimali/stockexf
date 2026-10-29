import { useState } from "react";
import {
  getUserDisplayName,
  getUserInitials,
  type UserListItem,
} from "../model/users";
import { Icon } from "./Icons";

const ROLE_LABELS: Record<string, string> = {
  system_admin: "System Admin",
  exchange_officer: "Exchange Officer",
  company_rep: "Company Representative",
  investor: "Investor",
};

const ROLE_BADGES: Record<string, string> = {
  system_admin: "bg-brand-50 text-brand-600",
  exchange_officer: "bg-blue-light-50 text-blue-light-600",
  company_rep: "bg-brand-50 text-brand-700",
  investor: "bg-surface-2 text-text-soft",
};

const STATUS_LABELS = {
  active: "Active",
  inactive: "Inactive",
} as const;

type UserRowProps = {
  user: UserListItem;
  selected: boolean;
  isLast: boolean;
  onToggle: (email: string) => void;
  currentUserId: string;
};

export function UserRow({
  user,
  selected,
  isLast,
  onToggle,
  currentUserId,
}: UserRowProps) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const displayName = getUserDisplayName(user);
  const role = user.roles[0];
  const roleLabel = role ? (ROLE_LABELS[role] ?? role) : "No role";
  const roleBadge = ROLE_BADGES[role ?? ""] ?? "bg-surface-2 text-text-soft";
  const status = user.isActive ? "active" : "inactive";
  const statusStyle = user.isActive
    ? {
        badge: "bg-success-50 text-success-700",
        dot: "bg-success-500",
      }
    : {
        badge: "bg-surface-2 text-text-soft",
        dot: "bg-muted-2",
      };
  const avatarUrl = `/api/user/${user.id}/avatar`;

  return (
    <tr
      className={`transition-colors hover:bg-surface/60 ${
        isLast ? "" : "border-b border-line-soft"
      } ${user.id === currentUserId ? "bg-brand-50/20" : ""}`}
    >
      <td className="px-4 py-2.5 text-center align-middle">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(user.email)}
          aria-label={`Select ${displayName}`}
          className="h-4 w-4 cursor-pointer rounded text-brand-500 accent-brand-500"
        />
      </td>

      <td className="px-4 py-2.5 align-middle">
        <div className="flex items-center gap-2.5">
          {!avatarFailed ? (
            <div className="relative h-8 w-8 shrink-0">
              <img
                src={avatarUrl}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
                onError={() => setAvatarFailed(true)}
              />
            </div>
          ) : (
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600"
            >
              {getUserInitials(user)}
            </div>
          )}

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="text-sm font-medium text-text">{displayName}</span>
              {user.id === currentUserId && (
                <span className="rounded bg-brand-50 px-1.5 py-px font-mono text-[10px] font-semibold text-brand-600">
                  YOU
                </span>
              )}
            </div>
            <span className="truncate text-xs leading-tight text-muted">
              {user.email}
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 py-2.5 align-middle">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${roleBadge}`}
        >
          {roleLabel}
        </span>
      </td>

      <td className="px-4 py-2.5 align-middle">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
          {STATUS_LABELS[status]}
        </span>
      </td>

      <td className="px-4 py-2.5 align-middle">
        {user.isEmailVerified ? (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
            <Icon name="verified" className="h-4 w-4" />
            Verified
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-warning">
            <Icon name="unverified" className="h-4 w-4 shrink-0" />
            Unverified
          </div>
        )}
      </td>

      <td className="px-4 py-2.5 align-middle">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium leading-tight text-text">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </td>

      <td className="relative overflow-visible px-4 py-2.5 text-right align-middle">
        <div className="inline-flex items-center justify-end">
          <button
            type="button"
            title="More options"
            aria-label={`More options for ${displayName}`}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Icon name="more_horiz" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </td>
    </tr>
  );
}
