"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  transactions: "Transactions",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Overview";

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        <Header title={title} onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
