import { transactions } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Wallet } from "lucide-react";
import type { Transaction } from "@/types";

const iconMap: Record<Transaction["icon"], React.ReactNode> = {
  card: <CreditCard className="w-5 h-5" />,
  paypal: <Wallet className="w-5 h-5" />,
  user: <Wallet className="w-5 h-5" />,
};

const iconBgMap: Record<Transaction["icon"], string> = {
  card: "bg-[#FFF3D6] text-[#E0A32E]",
  paypal: "bg-[#E9E5FF] text-[#5B4FE9]",
  user: "bg-[#DDF4E7] text-[#2FA36B]",
};

export function RecentTransactions() {
  return (
    <div className="bg-surface rounded-card p-6 shadow-card h-full">
      <h2 className="font-bold text-text-primary mb-5">Recent Transaction</h2>

      <div className="flex flex-col gap-5">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                iconBgMap[transaction.icon]
              }`}
            >
              {iconMap[transaction.icon]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {transaction.name}
              </p>
              <p className="text-xs text-text-secondary">{transaction.date}</p>
            </div>

            <p
              className={`text-sm font-semibold shrink-0 ${
                transaction.type === "income" ? "text-deposit" : "text-withdraw"
              }`}
            >
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
