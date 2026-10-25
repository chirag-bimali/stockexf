import { Link } from "@tanstack/react-router";
import logo from "../../../assets/logo.png";
import { AppleIcon, GoogleIcon } from "./Icons";
import { BrandPanel } from "./BrandPanel";
import { SigninForm } from "./SigninForm";

const socialButtonClass =
  "flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-card border border-line shadow-theme-xs text-sm font-medium text-text-soft hover:bg-surface active:translate-y-px transition-all cursor-pointer";

export function SigninPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-background text-text">
      <BrandPanel />

      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 xl:px-24 py-12 md:py-16 bg-background">
        {/* Top bar */}
        <div className="w-full max-w-md flex items-center justify-between mb-8 sm:mb-12">
          <div className="lg:hidden flex items-center gap-2.5">
            <img
              src={logo}
              alt="Stockex logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-base font-semibold tracking-tight">
              Stockex
            </span>
          </div>
          <div className="ml-auto text-sm text-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-md flex flex-col my-auto">
          <div className="mb-8 text-left">
            <h2 className="mb-1.5 text-2xl md:text-3xl font-bold tracking-tight text-text">
              Welcome back
            </h2>
            <p className="text-sm md:text-base text-muted">
              Sign in to your Stockex account to continue trading.
            </p>
          </div>

          {/* Social SSO (UI only for now) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              aria-label="Sign in with Google"
              className={socialButtonClass}
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>Google</span>
            </button>
            <button
              type="button"
              aria-label="Sign in with Apple"
              className={socialButtonClass}
            >
              <AppleIcon className="w-4 h-4 shrink-0 text-text" />
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full h-px bg-line" />
            <span className="absolute px-3 bg-background text-xs uppercase tracking-wider text-muted-2">
              Or continue with email
            </span>
          </div>

          <SigninForm />
        </div>

        {/* Footer */}
        <div className="w-full max-w-md pt-6 mt-8 border-t border-line/60 flex items-center justify-between text-xs text-muted-2">
          <span>© 2025 Stockex Global Technologies Inc.</span>
          <div className="flex items-center gap-2 text-muted">
            <a href="#terms" className="hover:text-text transition-colors">
              Terms
            </a>
            <span className="text-muted-2 select-none">•</span>
            <a href="#privacy" className="hover:text-text transition-colors">
              Privacy
            </a>
            <span className="text-muted-2 select-none">•</span>
            <a href="#api" className="hover:text-text transition-colors">
              API
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
