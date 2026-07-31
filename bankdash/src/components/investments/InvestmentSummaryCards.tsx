import { investmentSummary } from "@/data/mock-data";
import { PieChart, PiggyBank, RefreshCcw } from "lucide-react";

const iconMap = [
  { icon: PiggyBank, bg: "bg-[#DDF4E7]", color: "text-[#2FA36B]" },
  { icon: PieChart, bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
  { icon: RefreshCcw, bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" },
];

export function InvestmentSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {investmentSummary.map((item, index) => {
        const { icon: Icon, bg, color } = iconMap[index];

        return (
          <div
            key={item.label}
            className="bg-surface rounded-card p-4 shadow-card flex items-center gap-3"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text-secondary truncate">
                {item.label}
              </p>
              <p className="text-lg font-bold text-text-primary">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
