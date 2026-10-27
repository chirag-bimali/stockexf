import { useMutation } from "@tanstack/react-query";
import { signin } from "../api/signin.api";
import type { ApiClientError } from "@shared/api";
import type { SigninResult } from "@shared/auth";
import type { SigninValues } from "./schema";

export function useSignin() {
  return useMutation<SigninResult, ApiClientError, SigninValues>({
    mutationFn: signin,
  });
}
