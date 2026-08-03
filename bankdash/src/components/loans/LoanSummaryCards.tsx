import { loanSummary } from "@/data/mock-data";
import { Briefcase, TrendingUp, User, Wrench } from "lucide-react";

const iconMap = [
  { icon: User, bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" },
  { icon: Briefcase, bg: "bg-[#FFF3D6]", color: "text-[#E0A32E]" },
  { icon: TrendingUp, bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
  { icon: Wrench, bg: "bg-[#DDF4E7]", color: "text-[#2FA36B]" },
];

export function LoanSummaryCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {loanSummary.map((item, index) => {
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
              <p className="text-lg font-bold text-text-primary truncate">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
