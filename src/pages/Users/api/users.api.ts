import { api } from "@shared/api";
import type { GetUsersParams, UserListResponse } from "../model/users";

export function getUsers(params: GetUsersParams): Promise<UserListResponse> {
  return api.get<UserListResponse>("/user", { params });
}
