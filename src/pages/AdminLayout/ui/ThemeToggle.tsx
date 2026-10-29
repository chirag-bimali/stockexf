import { useTheme } from "../model/useTheme";
import { Icon } from "./Icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-surface hover:text-text"
    >
      <Icon
        name={isDark ? "dark_mode" : "light_mode"}
        className="h-[19px] w-[19px]"
      />
    </button>
  );
}
