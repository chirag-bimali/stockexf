import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { signinSchema, type SigninValues } from "./schema";
import { signin } from "./signin.api";

export function useSigninForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await signin(values);
      await navigate({ to: "/" });
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
