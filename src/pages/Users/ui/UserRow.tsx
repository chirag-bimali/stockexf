import type {
  AvatarTone,
  User,
  UserRole,
  UserStatus,
} from "../model/users";
import { Icon } from "./Icons";

const ROLE_LABELS: Record<UserRole, string> = {
  system_admin: "System Admin",
  exchange_officer: "Exchange Officer",
  company_rep: "Company Representative",
  investor: "Investor",
};

const ROLE_BADGES: Record<UserRole, string> = {
  system_admin: "bg-brand-50 text-brand-600",
  exchange_officer: "bg-blue-light-50 text-blue-light-600",
  company_rep: "bg-brand-50 text-brand-700",
  investor: "bg-surface-2 text-text-soft",
};

const STATUS_LABELS: Record<UserStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  locked: "Locked",
};

const STATUS_STYLES: Record<UserStatus, { badge: string; dot: string }> = {
  active: {
    badge: "bg-success-50 text-success-700",
    dot: "bg-success-500",
  },
  suspended: {
    badge: "bg-surface-2 text-text-soft",
    dot: "bg-muted-2",
  },
  locked: {
    badge: "bg-warning-50 text-warning-700",
    dot: "bg-warning-500",
  },
};

const AVATAR_TONES: Record<AvatarTone, string> = {
  brand: "bg-brand-50 text-brand-600",
  blue: "bg-blue-light-100 text-blue-light-600",
  warning: "bg-warning-100 text-warning-700",
  gray: "bg-surface-2 text-text-soft",
};

type UserRowProps = {
  user: User;
  selected: boolean;
  isLast: boolean;
  onToggle: (email: string) => void;
};

export function UserRow({ user, selected, isLast, onToggle }: UserRowProps) {
  const status = STATUS_STYLES[user.status];

  return (
    <tr
      className={`transition-colors hover:bg-surface/60 ${
        isLast ? "" : "border-b border-line-soft"
      } ${user.isCurrentUser ? "bg-brand-50/20" : ""}`}
    >
      <td className="px-4 py-2.5 text-center align-middle">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(user.email)}
          aria-label={`Select ${user.name}`}
          className="h-4 w-4 cursor-pointer rounded text-brand-500 accent-brand-500"
        />
      </td>

      <td className="px-4 py-2.5 align-middle">
        <div className="flex items-center gap-2.5">
          {user.avatar ? (
            <div className="relative shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              {user.isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-success-500 ring-2 ring-card" />
              )}
            </div>
          ) : (
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                AVATAR_TONES[user.avatarTone ?? "gray"]
              }`}
            >
              {user.initials}
            </div>
          )}

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="text-sm font-medium text-text">{user.name}</span>
              {user.isCurrentUser && (
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
          className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
            ROLE_BADGES[user.role]
          }`}
        >
          {user.roleShort ?? ROLE_LABELS[user.role]}
        </span>
      </td>

      <td className="px-4 py-2.5 align-middle">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {STATUS_LABELS[user.status]}
        </span>
      </td>

      <td className="px-4 py-2.5 align-middle">
        {user.verified ? (
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
            {user.lastActiveOn}
          </span>
          <span className="text-xs leading-tight text-muted-2">
            {user.lastActiveAgo}
          </span>
        </div>
      </td>

      <td className="relative overflow-visible px-4 py-2.5 text-right align-middle">
        <div className="inline-flex items-center justify-end">
          <button
            type="button"
            title="More options"
            aria-label={`More options for ${user.name}`}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Icon name="more_horiz" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </td>
    </tr>
  );
}
