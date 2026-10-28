// Single source of truth for permission names.
// Keep these identical to the strings the backend returns from /Auth/me.
export const PERMISSIONS = {
  AdminAccess: "admin.access",
  TraderAccess: "trader.access",

  UsersCreate: "users.create",
  UsersRead: "users.read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
