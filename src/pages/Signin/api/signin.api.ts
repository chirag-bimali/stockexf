import { api } from "@shared/api";
import type { SigninResult } from "@shared/auth";
import type { SigninValues } from "../model/schema";

export const signin = async ({
  email,
  password,
}: SigninValues): Promise<SigninResult> => {
  return api.post<SigninResult>("/Auth/signin", { email, password });
};
