import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-header items-center justify-between border-b border-line bg-card px-6">
      <div className="relative w-72">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-2"
        />
        <input
          type="text"
          placeholder="Search or type command..."
          aria-label="Search or type command"
          className="h-10 w-full rounded-lg border border-line bg-surface/50 pl-9 pr-3.5 text-sm text-text transition-all placeholder:text-muted-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          title="Notifications"
          aria-label="Notifications"
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-surface hover:text-text"
        >
          <Icon name="notifications" className="h-[19px] w-[19px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-card" />
        </button>
        <div className="mx-1 h-5 w-px bg-line" />
        <UserMenu />
      </div>
    </header>
  );
}
