import { Link } from "@tanstack/react-router";
import { PASSWORD_HINT, useSignupForm } from "../model";
import {
  AlertIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  SpinnerIcon,
} from "./Icons";
import { FieldMessage } from "./FieldMessage";
import { StrengthLabel, StrengthMeter } from "./StrengthMeter";
import { TextField } from "./TextField";

const linkClass =
  "font-medium text-text underline underline-offset-2 hover:text-accent transition-colors";

export function SignupForm() {
  const form = useSignupForm();
  const { errors, touched } = form;

  return (
    <form
      className="flex flex-col gap-4 mt-2"
      onSubmit={form.onSubmit}
      noValidate
    >
      {/* Names */}
      <div className="grid grid-cols-2 gap-3 items-start">
        <TextField
          id="firstName"
          label="First name"
          hint="Legal name"
          errorHint="Required"
          autoComplete="given-name"
          placeholder="e.g. Alex"
          error={errors.firstName?.message}
          valid={touched.firstName && !errors.firstName}
          {...form.register("firstName")}
        />
        <TextField
          id="lastName"
          label="Last name"
          errorHint="Required"
          autoComplete="family-name"
          placeholder="e.g. Mercer"
          error={errors.lastName?.message}
          valid={touched.lastName && !errors.lastName}
          {...form.register("lastName")}
        />
      </div>

      {/* Email */}
      <TextField
        id="email"
        type="email"
        label="Email address"
        hint="Work or personal"
        autoComplete="email"
        placeholder="alex@example.com"
        error={errors.email?.message}
        valid={touched.email && !errors.email}
        errorAction={
          form.emailTaken && (
            <Link
              to="/signin"
              className="shrink-0 font-medium underline underline-offset-2"
            >
              Sign in instead
            </Link>
          )
        }
        {...form.register("email")}
      />

      {/* Password */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-soft"
          >
            Password
          </label>
          <StrengthLabel strength={form.strength} />
        </div>
        <div className="relative">
          <input
            id="password"
            type={form.showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••••••"
            aria-invalid={!!errors.password}
            aria-describedby="password-message"
            className={`w-full h-11 pl-4 pr-11 text-sm text-text placeholder:text-muted-2 bg-card border rounded-xl shadow-theme-xs transition-colors focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-danger bg-danger-soft focus:border-danger focus:ring-danger/20"
                : "border-line focus:ring-accent/20 focus:border-accent"
            }`}
            {...form.register("password")}
          />
          <button
            type="button"
            onClick={form.toggleShowPassword}
            aria-label={form.showPassword ? "Hide password" : "Show password"}
            aria-pressed={form.showPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-2 hover:text-muted transition-colors cursor-pointer"
          >
            {form.showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <StrengthMeter strength={form.strength} />
        <FieldMessage
          id="password-message"
          error={errors.password?.message}
          hint={PASSWORD_HINT}
        />
      </div>

      {/* Terms */}
      <div
        className={`rounded-xl border p-4 transition-colors ${
          errors.acceptTerms
            ? "border-error-100 bg-danger-soft"
            : "border-line bg-surface"
        }`}
      >
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            id="acceptTerms"
            type="checkbox"
            aria-invalid={!!errors.acceptTerms}
            aria-describedby="acceptTerms-message"
            className={`mt-0.5 w-5 h-5 shrink-0 cursor-pointer ${
              errors.acceptTerms ? "accent-danger" : "accent-accent"
            }`}
            {...form.register("acceptTerms")}
          />
          <span className="text-sm text-text-soft leading-snug">
            I agree to the{" "}
            <a href="#terms" className={linkClass}>
              Terms of Service
            </a>{" "}
            and acknowledge the{" "}
            <a href="#privacy" className={linkClass}>
              Privacy Policy
            </a>{" "}
            &amp;{" "}
            <a href="#risk" className={linkClass}>
              Risk Disclosure
            </a>
            .
          </span>
        </label>
        {errors.acceptTerms && (
          <p
            id="acceptTerms-message"
            role="alert"
            className="flex items-center gap-1.5 mt-2 pl-8 text-xs text-danger"
          >
            <AlertIcon className="w-3.5 h-3.5 shrink-0" />
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

      {/* Server error alert */}
      {form.serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-danger-soft border border-error-500"
        >
          <AlertIcon className="w-6 h-6 shrink-0 text-error-500" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-text">
              Couldn't create account
            </p>
            <p className="text-sm text-muted">{form.serverError}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={form.isSubmitting}
        className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-contrast text-base font-semibold shadow-theme-xs hover:bg-accent-hover active:translate-y-px transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {form.isSubmitting ? (
          <>
            <SpinnerIcon className="w-[18px] h-[18px] animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Create account</span>
            <ArrowRightIcon className="w-[18px] h-[18px]" />
          </>
        )}
      </button>
    </form>
  );
}
