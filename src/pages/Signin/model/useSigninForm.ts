import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { signinSchema, type SigninValues } from "./schema";
import { useSignin } from "./useSignin";
import { useAuthStore } from "@shared/auth";
import { queryClient } from "@shared/lib";

export function useSigninForm() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/signin" });
  const { mutateAsync } = useSignin();
  const signIn = useAuthStore((state) => state.signIn);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const data = await mutateAsync({
        email: values.email.trim().toLowerCase(),
        password: values.password,
        remember: values.remember,
      });

      signIn(data, values.remember);
      queryClient.clear();

      if (search.redirect) {
        navigate({ href: search.redirect, replace: true });
      } else {
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      form.setError("root.serverError", {
        message:
          err instanceof Error
            ? err.message
            : "Authentication failed. Check your credentials.",
      });
    }
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    serverError: form.formState.errors.root?.serverError?.message,
    showPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
    onSubmit,
  };
}
