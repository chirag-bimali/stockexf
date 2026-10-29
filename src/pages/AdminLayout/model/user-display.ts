export function getInitials(name: string): string {
  const words = name.split(" ").filter(Boolean);

  if (words.length === 0) return "AC";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
}
