import { queryOptions } from "@tanstack/react-query";
import { getUsers } from "../api/users.api";
import type { GetUsersParams } from "./users";

export const usersKeys = {
  all: ["users"] as const,
  list: (params: GetUsersParams) => [...usersKeys.all, params] as const,
};

export function usersQueryOptions(params: GetUsersParams) {
  return queryOptions({
    queryKey: usersKeys.list(params),
    queryFn: () => getUsers(params),
    placeholderData: (previousData) => previousData,
  });
}
