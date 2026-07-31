import { myInvestments } from "@/data/mock-data";
import { ShoppingBag, Smartphone, Zap } from "lucide-react";

const iconMap: Record<
  string,
  { icon: typeof ShoppingBag; bg: string; color: string }
> = {
  "Apple Store": {
    icon: ShoppingBag,
    bg: "bg-[#FFE0E9]",
    color: "text-[#FE5C73]",
  },
  "Samsung Mobile": {
    icon: Smartphone,
    bg: "bg-[#E9E5FF]",
    color: "text-[#5B4FE9]",
  },
  "Tesla Motors": { icon: Zap, bg: "bg-[#FFF3D6]", color: "text-[#E0A32E]" },
};

export function MyInvestmentList() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        My Investment
      </h2>

      <div className="flex flex-col gap-4">
        {myInvestments.map((investment) => {
          const iconConfig = iconMap[investment.name] ?? {
            icon: ShoppingBag,
            bg: "bg-[#DDF4E7]",
            color: "text-[#2FA36B]",
          };

          const Icon = iconConfig.icon;
          const isPositive = investment.returnPercent >= 0;

          return (
            <div
              key={investment.id}
              className="bg-surface rounded-card p-4 shadow-card flex items-center gap-4"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconConfig.bg} ${iconConfig.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {investment.name}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {investment.category}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-text-primary">
                  ${investment.value.toLocaleString("en-US")}
                </p>
                <p className="text-xs text-text-secondary">Investment Value</p>
              </div>

              <div className="text-right shrink-0 w-16">
                <p
                  className={`text-sm font-semibold ${
                    isPositive ? "text-deposit" : "text-withdraw"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {investment.returnPercent}%
                </p>
                <p className="text-xs text-text-secondary">Return Value</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
