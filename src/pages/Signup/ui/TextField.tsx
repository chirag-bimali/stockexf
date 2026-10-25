import type { ComponentProps, ReactNode } from "react";
import { AlertIcon, CheckCircleIcon } from "./Icons";
import { FieldMessage } from "./FieldMessage";

const inputClass =
  "w-full h-11 pl-4 pr-11 text-sm text-text placeholder:text-muted-2 bg-card border border-line rounded-xl shadow-theme-xs transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";
const inputErrorClass =
  "border-danger bg-danger-soft focus:border-danger focus:ring-danger/20";

type TextFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  /** Small text on the right of the label row. */
  hint?: string;
  /** Replaces `hint` (in red) while the field has an error. */
  errorHint?: string;
  error?: string;
  /** Show the green check icon. */
  valid?: boolean;
  /** Element pinned right of the error message. */
  errorAction?: ReactNode;
};

export function TextField({
  id,
  label,
  hint,
  errorHint,
  error,
  valid,
  errorAction,
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-soft"
        >
          {label}
        </label>
        {(error ? errorHint : hint) && (
          <span
            className={`text-xs font-medium ${error ? "text-danger" : "text-muted-2"}`}
          >
            {error ? errorHint : hint}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={`${id}-message`}
          className={`${inputClass} ${error ? inputErrorClass : ""} ${className ?? ""}`}
          {...inputProps}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
          {error ? (
            <AlertIcon className="w-5 h-5 text-danger" />
          ) : valid ? (
            <CheckCircleIcon className="w-5 h-5 text-success" />
          ) : null}
        </span>
      </div>
      <FieldMessage id={`${id}-message`} error={error} action={errorAction} />
    </div>
  );
}
