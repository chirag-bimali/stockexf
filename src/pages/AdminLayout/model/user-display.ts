export function getDisplayName(email: string | undefined): string {
  const localPart = email?.split("@")[0] ?? "";
  const words = localPart.split(/[._-]+/).filter(Boolean);

  if (words.length === 0) return "Account";

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getInitials(name: string): string {
  const words = name.split(" ").filter(Boolean);

  if (words.length === 0) return "AC";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
}
