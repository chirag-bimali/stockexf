import type { PasswordStrength } from "../model/passwordStrength";

// Full class names (not built dynamically) so Tailwind can see them.
const FILL = [
  "bg-error-500",
  "bg-orange-500",
  "bg-warning-500",
  "bg-success-500",
];
const TEXT = ["text-danger", "text-orange-600", "text-warning", "text-success"];

export function StrengthMeter({ strength }: { strength: PasswordStrength }) {
  const { level, label } = strength;

  return (
    <div className="mt-2" aria-live="polite">
      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1 rounded-full transition-colors duration-300 ${
              bar <= level ? FILL[level - 1] : "bg-line"
            }`}
          />
        ))}
      </div>
      <span className="sr-only">Password strength: {label}</span>
    </div>
  );
}

export function StrengthLabel({ strength }: { strength: PasswordStrength }) {
  if (strength.level === 0) return null;
  return (
    <span className="text-xs font-medium text-muted-2">
      Strength:{" "}
      <span className={TEXT[strength.level - 1]}>{strength.label}</span>
    </span>
  );
}