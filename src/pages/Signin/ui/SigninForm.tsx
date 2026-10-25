import { PASSWORD_HINT, useSigninForm } from "../model";
import { FieldMessage } from "./FieldMessage";
import {
  AlertIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  SpinnerIcon,
} from "./Icons";

const inputClass =
  "w-full h-11 px-4 text-sm text-text placeholder:text-muted-2 bg-card border border-line rounded-xl shadow-theme-xs transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";
const inputErrorClass =
  "border-danger focus:border-danger focus:ring-danger/20";

export function SigninForm() {
  const form = useSigninForm();

  return (
    <form
      className="flex flex-col gap-4 mt-2"
      onSubmit={form.onSubmit}
      noValidate
    >
      {/* Email */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="block mb-1.5 text-sm font-medium text-text-soft"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="alex@example.com"
          aria-invalid={!!form.errors.email}
          aria-describedby={form.errors.email ? "email-error" : undefined}
          className={`${inputClass} ${form.errors.email ? inputErrorClass : ""}`}
          {...form.register("email")}
        />
        <FieldMessage id="email-message" error={form.errors.email?.message} />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-soft"
          >
            Password
          </label>
          <a
            href="#forgot"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <input
            id="password"
            type={form.showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••••••"
            aria-invalid={!!form.errors.password}
            aria-describedby={
              form.errors.password ? "password-message" : undefined
            }
            className={`${inputClass} pr-11 ${form.errors.password ? inputErrorClass : ""}`}
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
        <FieldMessage
          id="password-message"
          error={form.errors.password?.message}
          hint={PASSWORD_HINT}
        />
      </div>

      {/* Remember */}
      <div className="flex items-center justify-between py-1">
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <input
            id="remember"
            type="checkbox"
            {...form.register("remember")}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <span className="text-sm text-muted group-hover:text-text transition-colors">
            Remember this device
          </span>
        </label>
      </div>

      {/* Server error alert */}
      {form.serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-danger-soft border border-error-500"
        >
          <AlertIcon className="w-6 h-6 shrink-0 text-error-500" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-text">Sign-in failed</p>
            <p className="text-sm text-muted">{form.serverError}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={form.isSubmitting}
        className="w-full h-11 mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-contrast text-base font-semibold shadow-theme-xs hover:bg-accent-hover active:translate-y-px transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {form.isSubmitting ? (
          <>
            <SpinnerIcon className="w-[18px] h-[18px] animate-spin" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <span>Sign in</span>
            <ArrowRightIcon className="w-[18px] h-[18px]" />
          </>
        )}
      </button>
    </form>
  );
}
