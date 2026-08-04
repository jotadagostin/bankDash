import { serviceHighlights } from "@/data/mock-data";
import { Shield, ShieldCheck, ShoppingBag } from "lucide-react";

const iconMap = [
  { icon: ShieldCheck, bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" },
  { icon: ShoppingBag, bg: "bg-[#FFF3D6]", color: "text-[#E0A32E]" },
  { icon: Shield, bg: "bg-[#DDF4E7]", color: "text-[#2FA36B]" },
];

export function ServiceHighLights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {serviceHighlights.map((item, index) => {
        const { icon: Icon, bg, color } = iconMap[index];

        return (
          <div
            key={item.title}
            className="bg-surface rounded-card p-4 shadow-card flex items-center gap-3"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary truncate">
                {item.title}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
