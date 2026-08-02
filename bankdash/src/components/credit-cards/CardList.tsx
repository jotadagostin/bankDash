import { creditCardList } from "@/data/mock-data";
import { CreditCard } from "lucide-react";

const iconStyles = [
  { bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" },
  { bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
  { bg: "bg-[#FFF3D6]", color: "text-[#E0A32E]" },
];

export function CardList() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">Card List</h2>

      <div className="flex flex-col gap-4">
        {creditCardList.map((card, index) => {
          const { bg, color } = iconStyles[index % iconStyles.length];

          return (
            <div
              key={card.id}
              className="bg-surface rounded-card p-4 shadow-card flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
              >
                <CreditCard className="w-5 h-5" />
              </div>

              <div className="min-w-27.5">
                <p className="text-xs text-text-secondary">Card Type</p>
                <p className="text-sm font-medium text-text-primary">
                  {card.type}
                </p>
              </div>

              <div className="min-w-22.5">
                <p className="text-xs text-text-secondary">Bank</p>
                <p className="text-sm font-medium text-text-primary">
                  {card.bank}
                </p>
              </div>

              <div className="min-w-25">
                <p className="text-xs text-text-secondary">Namain Card</p>
                <p className="text-sm font-medium text-text-primary">
                  {card.cardholderName}
                </p>
              </div>

              <button
                type="button"
                className="ml-auto text-sm font-medium text-primary hover:underline shrink-0"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
