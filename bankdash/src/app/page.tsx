import { Header } from "@/components/layout/Header";
import { MyCards } from "@/components/dashboard/MyCards";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";
import { ExpenseStatistics } from "@/components/dashboard/ExpenseStatistics";
import { QuickTransfer } from "@/components/dashboard/QuickTransfer";
import { BalanceHistory } from "@/components/dashboard/BalanceHistory";
import { RecentTransactions } from "@/components/dashboard/RecentTransaction";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
          {/* Grid único: cada linha alinha My Cards/Weekly Activity com Recent Transaction/Expense Statistics */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <MyCards />
            </div>
            <div>
              <RecentTransactions />
            </div>

            <div className="col-span-2">
              <WeeklyActivity />
            </div>
            <div>
              <ExpenseStatistics />
            </div>
          </div>

          {/* Quick Transfer + Balance History (proporção 1:1, grid próprio) */}
          <div className="grid grid-cols-2 gap-6">
            <QuickTransfer />
            <BalanceHistory />
          </div>
        </main>
      </div>
    </div>
  );
}
