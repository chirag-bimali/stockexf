import { api } from "@shared/api";
import type { Me } from "../model/types";

export const getMe = (): Promise<Me> => api.get<Me>("/user/me");
