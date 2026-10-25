export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export type PasswordStrength = {
  /** 0 = empty, 1 = Weak, 2 = Fair, 3 = Good, 4 = Strong */
  level: StrengthLevel;
  label: "None" | "Weak" | "Fair" | "Good" | "Strong";
};

const LABELS: PasswordStrength["label"][] = [
  "None",
  "Weak",
  "Fair",
  "Good",
  "Strong",
];

/** One point each for: 8+ chars, upper & lower case, a number, a special symbol. */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { level: 0, label: "None" };

  const points = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  // A non-empty password is always at least "Weak" (1 bar).
  const level = Math.max(1, points) as StrengthLevel;
  return { level, label: LABELS[level] };
}
