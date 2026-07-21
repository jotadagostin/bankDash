"use client";

import {
  CreditCard,
  Home,
  Icon,
  Landmark,
  Receipt,
  Settings,
  Shield,
  User,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Transactions", href: "/transactions", icon: Receipt },
  { label: "Account", href: "/accounts", icon: User },
  { label: "Investments", href: "/investments", icon: Landmark },
  { label: "Credit Cards", href: "/credit-cards", icon: CreditCard },
  { label: "Loans", href: "/loans", icon: Wallet },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "My Privileges", href: "/privileges", icon: Shield },
  { label: "Setting", href: "/setting", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto md:min-h-screen w-64 shrink-0 bg-surface border-r border-black/5 px-4 py-6 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-2 mb-10">
          <Image src="/logo.png" alt="Logo" width={183} height={36} />
          <button onClick={onClose} className="md:hidden text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? "text-primary bg-primary-light"
                    : "text-text-muted hover:bg-primary-light/50"
                }`}
              >
                {isActive && (
                  <span className="absolute -left-4 top-0 h-full w-1 rounded-r-full bg-primary" />
                )}
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
