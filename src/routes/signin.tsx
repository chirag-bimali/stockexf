import { createFileRoute, redirect } from "@tanstack/react-router";
import { SigninPage } from "../pages/Signin";
import { isSessionExpired, useAuthStore } from "@shared/auth";

type SigninSearch = {
  redirect?: string;
};

function hasUnsafeChars(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code <= 0x1f || value[i] === "\\") return true;
  }
  return false;
}

function parseRedirect(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    hasUnsafeChars(value)
  ) {
    return undefined;
  }

  return value;
}

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>): SigninSearch => ({
    redirect: parseRedirect(search.redirect),
  }),
  beforeLoad: () => {
    const { session } = useAuthStore.getState();

    if (session && !isSessionExpired(session)) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <SigninPage />;
}
