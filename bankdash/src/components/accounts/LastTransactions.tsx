import { detailedTransactions } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { DetailedTransaction } from "@/types";
import { Icon, ShoppingBag, User, Wrench } from "lucide-react";

const categoryIconMap: Record<
  string,
  { icon: typeof ShoppingBag; bg: string; color: string }
> = {
  Shopping: { icon: ShoppingBag, bg: "bg-[#DDF4E7]", color: "text-[#2FA36B]" },
  Service: { icon: Wrench, bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" },
  Transfer: { icon: User, bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
};

function StatusBadge({ status }: { status: DetailedTransaction["status"] }) {
  if (!status) return null;

  const isPending = status === "Pending";

  return (
    <span
      className={`text-xs font-medium ${
        isPending ? "text-[#E0A32E]" : "text-deposit"
      }`}
    >
      {status}
    </span>
  );
}

export function LastTransaction() {
  const lastThree = detailedTransactions.filter((t) => t.status).slice(0, 3);

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Last Transaction
      </h2>

      <div className="bg-surface rounded-card p-4 shadow-card">
        <div className="flex flex-col gap-4">
          {lastThree.map((transaction) => {
            const iconConfig =
              categoryIconMap[transaction.category] ?? categoryIconMap.Transfer;
            const Icon = iconConfig.icon;

            return (
              <div
                key={transaction.id}
                className="flex items-center gap-3 flex-wrap sm:flex-nowrap"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconConfig.bg} ${iconConfig.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0 mr-auto">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {transaction.date}
                  </p>
                </div>

                <span className="text-xs text-text-secondary hidden sm:block w-20">
                  {transaction.category}
                </span>

                <span className="text-xs text-text-secondary hidden sm:block w-16">
                  {transaction.cardLast4} ****
                </span>

                <div className="w-20 shrink-0">
                  <StatusBadge status={transaction.status} />
                </div>

                <p
                  className={`text-sm font-semibold shrink-0 w-16 text-right ${
                    transaction.direction === "income"
                      ? "text-deposit"
                      : "text-withdraw"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
