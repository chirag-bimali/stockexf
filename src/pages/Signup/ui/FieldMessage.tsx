import type { ReactNode } from "react";
import { AlertIcon, InfoIcon } from "./Icons";

/**
 * Message slot under a field. It always reserves the same height so the layout
 * doesn't jump when an error appears. Shows the error if there is one, otherwise the hint.
 * `action` is an optional element pinned to the right (e.g. a "Sign in instead" link).
 */
export function FieldMessage({
  id,
  error,
  hint,
  action,
}: {
  id: string;
  error?: string;
  hint?: string;
  action?: ReactNode;
}) {
  const message = error ?? hint;

  return (
    <div
      id={id}
      className={`min-h-[22px] flex items-center justify-between gap-3 mt-1 text-xs select-none transition-colors ${
        error ? "text-danger" : "text-muted"
      }`}
    >
      <div className="flex items-center gap-1">
        {message &&
          (error ? (
            <AlertIcon className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <InfoIcon className="w-3.5 h-3.5 shrink-0 text-muted-2" />
          ))}
        {/* key remounts the span so screen readers announce a new error */}
        {message && (
          <span
            key={error ? "error" : "hint"}
            role={error ? "alert" : undefined}
          >
            {message}
          </span>
        )}
      </div>
      {error && action}
    </div>
  );
}
