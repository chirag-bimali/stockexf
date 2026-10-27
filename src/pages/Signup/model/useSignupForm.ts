import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { signupSchema, type SignupValues } from "./schema";
import { getPasswordStrength } from "./passwordStrength";
import { useSignup } from "./useSignup"; // adjust to your path
import { ApiClientError } from "@shared/api";

export function useSignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync } = useSignup();

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
      await mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        acceptTerms: values.acceptTerms,
      });



      navigate({ to: "/signin" });
    } catch (error) {
      if (!(error instanceof ApiClientError)) {
        form.setError("root.serverError", {
          type: "server",
          message: "Something went wrong. Please try again.",
        });
        return;
      }

      // 1. Email already exists
      if (error.code === "auth.email_exists") {
        form.setError("email", { type: "server", message: error.message });
        return;
      }

      // 2. Field errors from backend validation
      // let handled = false;
      // for (const [key, messages] of Object.entries(error.details ?? {})) {
      //   const name = (key.charAt(0).toLowerCase() + key.slice(1)) as FieldName;
      //   if (fields.includes(name)) {
      //     form.setError(name, { type: "server", message: messages[0] });
      //     handled = true;
      //   }
      // }
      // if (handled) return;

      // 3. Anything else
      form.setError("root.serverError", {
        type: "server",
        message: error.message,
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
