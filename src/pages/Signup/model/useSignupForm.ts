import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { EMAIL_TAKEN_MESSAGE, signupSchema, type SignupValues } from "./schema";
import { EmailAlreadyExistsError, signup } from "./signup.api";
import { getPasswordStrength } from "./passwordStrength";

export function useSignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const password = useWatch({ control: form.control, name: "password" });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await signup(values);
      await navigate({ to: "/signin" });
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError) {
        form.setError("email", {
          type: "server",
          message: EMAIL_TAKEN_MESSAGE,
        });
        form.setFocus("email");
        return;
      }
      form.setError("root.serverError", {
        message:
          err instanceof Error
            ? err.message
            : "We couldn't create your account. Please try again.",
      });
    }
  });

  const { errors, touchedFields } = form.formState;

  return {
    register: form.register,
    errors,
    touched: touchedFields,
    isSubmitting: form.formState.isSubmitting,
    serverError: errors.root?.serverError?.message,
    emailTaken: errors.email?.type === "server",
    strength: getPasswordStrength(password),
    showPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
    onSubmit,
  };
}
