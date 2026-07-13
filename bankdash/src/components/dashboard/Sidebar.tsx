"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Receipt,
  User,
  Landmark,
  CreditCard,
  Wallet,
  Wrench,
  Shield,
  Settings,
  Home,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Transactions", href: "/transactions", icon: Receipt },
  { label: "Accounts", href: "/accounts", icon: User },
  { label: "Investments", href: "/investments", icon: Landmark },
  { label: "Credit Cards", href: "/credit-cards", icon: CreditCard },
  { label: "Loans", href: "/loans", icon: Wallet },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "My Privileges", href: "/privileges", icon: Shield },
  { label: "Setting", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-surface border-r border-black/5 min-h-screen px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className=" rounded-lg  flex items-center justify-center">
          {/* <CreditCard className="w-5 h-5 text-white" /> */}
          <Image src="/logo.png" alt="Logo" width={183} height={36} />
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
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
  );
}
