import { BalanceHistory } from "@/components/dashboard/BalanceHistory";
import { ExpenseStatistics } from "@/components/dashboard/ExpenseStatistics";
import { MyCards } from "@/components/dashboard/MyCards";
import { QuickTransfer } from "@/components/dashboard/QuickTransfer";
import { RecentTransactions } from "@/components/dashboard/RecentTransaction";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";

export default function Home() {
  return (
    <>
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
    </>
  );
}
