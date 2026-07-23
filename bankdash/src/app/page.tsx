"use client";

import { Header } from "@/components/layout/Header";
import { MyCards } from "@/components/dashboard/MyCards";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";
import { ExpenseStatistics } from "@/components/dashboard/ExpenseStatistics";
import { QuickTransfer } from "@/components/dashboard/QuickTransfer";
import { BalanceHistory } from "@/components/dashboard/BalanceHistory";
import { RecentTransactions } from "@/components/dashboard/RecentTransaction";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <Header title="Overview" onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MyCards />
            </div>
            <div>
              <RecentTransactions />
            </div>

            <div className="md:col-span-2">
              <WeeklyActivity />
            </div>
            <div>
              <ExpenseStatistics />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickTransfer />
            <BalanceHistory />
          </div>
        </main>
      </div>
    </div>
  );
}
