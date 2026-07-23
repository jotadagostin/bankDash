import Image from "next/image";
import { Search, Settings, Bell, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-background">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden text-text-primary">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
          </div>
          <h1 className="md:hidden text-lg font-bold text-text-primary">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:block relative">
            <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for something"
              className="pl-11 pr-4 py-2.5 w-64 rounded-input bg-surface text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface flex items-center justify-center text-text-secondary">
            <Settings className="w-5 h-5 cursor-pointer" />
          </button>
          <button className="relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface flex items-center justify-center text-text-secondary">
            <Bell className="w-5 h-5 cursor-pointer" />
            <span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-withdraw cursor-pointer" />
          </button>
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden relative">
            <Image
              src="https://i.pravatar.cc/150?img=47"
              alt="User avatar"
              fill
              className="object-cover cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Search bar full-width, só aparece no mobile */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for something"
            className="w-full pl-11 pr-4 py-2.5 rounded-input bg-surface text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
    </header>
  );
}
