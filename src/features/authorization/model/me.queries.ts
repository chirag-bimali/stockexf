import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../api/me.api";

export const meKeys = {
  all: ["auth", "me"] as const,
  // The user id is part of the key so two users never share cached permissions.
  byUser: (userId: string) => [...meKeys.all, userId] as const,
};

export const meQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: meKeys.byUser(userId),
    queryFn: getMe,
    staleTime: 5 * 60_000,
  });
