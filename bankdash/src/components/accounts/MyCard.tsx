import { cards } from "@/data/mock-data";
import { formatBalance } from "@/lib/utils";
import Image from "next/image";

export function MyCard() {
  const card = cards[0]; //use the first card variant as referenc...
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-heading">My Card</h2>
        <button
          type="button"
          className="text-sm font-medium text-heading hover:text-primary transition-colors cursor-pointer"
        >
          See All
        </button>
      </div>

      <div className="bg-linear-to-br from-(--color-card-gradient-start) to-(--color-card-gradient-end) text-white rounded-card p-6 shadow-card h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70 mb-1">Balance</p>
            <p className="text-xl font-semibold">
              {formatBalance(card.balance)}
            </p>
          </div>
          <Image src="/chip-white.svg" alt="Card chip" width={32} height={24} />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-white/60 mb-0.5">
              Card Holder
            </p>
            <p className="text-sm font-medium">{card.cardHolder}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-white/60 mb-0.5">
              Valid Thru
            </p>
            <p className="text-sm font-medium">{card.validThru}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm tracking-widest font-medium">
            {card.cardNumber}
          </p>
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-white/40" />
            <div className="w-6 h-6 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
