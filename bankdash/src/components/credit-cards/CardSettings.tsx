import { cardSettings } from "@/data/mock-data";
import { Ban, KeyRound, Apple, Store, Smartphone } from "lucide-react";

const iconMap: Record<string, { icon: typeof Ban; bg: string; color: string }> =
  {
    "Block Card": { icon: Ban, bg: "bg-[#FFF3D6]", color: "text-[#E0A32E]" },
    "Change Pic Code": {
      icon: KeyRound,
      bg: "bg-[#E9E5FF]",
      color: "text-[#5B4FE9]",
    },
    "Add to Google Pay": {
      icon: Smartphone,
      bg: "bg-[#FFE0E9]",
      color: "text-[#FE5C73]",
    },
    "Add to Apple Pay": {
      icon: Apple,
      bg: "bg-[#DDF4E7]",
      color: "text-[#2FA36B]",
    },
    "Add to Apple Store": {
      icon: Store,
      bg: "bg-[#DDF4E7]",
      color: "text-[#2FA36B]",
    },
  };

export function CardSettings() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Card Settings
      </h2>

      <div className="bg-surface rounded-card p-4 shadow-card flex flex-col gap-4">
        {cardSettings.map((setting) => {
          const iconConfig = iconMap[setting.title] ?? {
            icon: Ban,
            bg: "bg-[#DDF4E7]",
            color: "text-[#2FA36B]",
          };
          const Icon = iconConfig.icon;

          return (
            <button
              key={setting.id}
              type="button"
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconConfig.bg} ${iconConfig.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {setting.title}
                </p>
                <p className="text-xs text-text-secondary">
                  {setting.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
