import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@shared/auth";
import { useSignOut } from "@features/auth";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const session = useAuth();
  const signOut = useSignOut();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      {session ? (
        <div className="mt-4 flex items-center gap-3">
          <span>{session.user.email}</span>
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </div>
  );
}
