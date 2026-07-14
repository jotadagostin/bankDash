import { MyCards } from "@/components/dashboard/MyCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransaction";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="max-w-7xl mx-auto grid grid-cols-3 gap-6 p-6">
          <div className="col-span-2">
            <MyCards />
            <WeeklyActivity />
          </div>
          <RecentTransactions />
        </main>
      </div>
    </div>
  );
}
