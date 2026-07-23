"use client";

import { MyCards } from "@/components/dashboard/MyCards";
import { ExpenseChart } from "@/components/transactions/ExpenseChart";
import { TransactionTable } from "@/components/transactions/TransactionsTable";

export default function TransactionsPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <MyCards />
        </div>
        <div>
          <ExpenseChart />
        </div>
      </div>

      <TransactionTable />
    </>
  );
}
