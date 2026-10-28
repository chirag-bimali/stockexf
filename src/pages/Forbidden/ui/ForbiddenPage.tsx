import { Link } from "@tanstack/react-router";

export function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="text-sm opacity-70">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="text-sm underline">
        Back to home
      </Link>
    </main>
  );
}
