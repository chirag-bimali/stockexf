import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/signup.api";
import type { SignupValues } from "./schema";
import type { ApiClientError } from "@shared/api";

export function useSignup() {
  return useMutation<string, ApiClientError, SignupValues>({
    mutationFn: signup,
  });
}
