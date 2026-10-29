export type UserListItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  roles: string[];
};

export type UserListResponse = {
  items: UserListItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type GetUsersParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  role?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
};

export function getUserDisplayName(user: UserListItem): string {
  return `${user.firstName} ${user.lastName}`.trim() || user.email;
}

export function getUserInitials(user: UserListItem): string {
  const name = getUserDisplayName(user);
  const words = name.split(/\s+/).filter(Boolean);

  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
