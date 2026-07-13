import Image from "next/image";
import { Search, Settings, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-background">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Overview</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for something"
            className="pl-11 pr-4 py-2.5 w-64 rounded-input bg-surface text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <button
          type="button"
          aria-label="Settings"
          className="w-11 h-11 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative w-11 h-11 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-withdraw" />
        </button>

        <div className="w-11 h-11 rounded-full overflow-hidden relative">
          <Image
            src="https://i.pravatar.cc/150?img=47"
            alt="User avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
