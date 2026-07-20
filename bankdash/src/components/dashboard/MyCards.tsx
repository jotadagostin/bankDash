import { cards } from "@/data/mock-data";
import { formatBalance } from "@/lib/utils";
import Image from "next/image";

export function MyCards() {
  return (
    // <div className="bg-surface rounded-card p-6 shadow-card">
    //   <div className="flex items-center justify-between mb-5">
    //     <h2 className="font-bold text-heading text-[22px]">My Cards</h2>
    //     <button
    //       type="button"
    //       className="text-sm text-text-secondary hover:text-primary transition-colors"
    //     >
    //       See All
    //     </button>
    //   </div>

    //   <div className="flex gap-4 overflow-x-auto">
    //     {cards.map((card) => {
    //       const isPrimary = card.variant === "primary";

    //       return (
    //         <div
    //           key={card.id}
    //           className={`shrink-0 w-72 rounded-2xl p-5 flex flex-col justify-between h-44 ${
    //             isPrimary
    //               ? "bg-linear-to-br from-(--color-card-gradient-start) to-(--color-card-gradient-end) text-white"
    //               : "bg-white border border-black/5 text-text-primary"
    //           }`}
    //         >
    //           <div className="flex items-start justify-between">
    //             <div>
    //               <p
    //                 className={`text-xs mb-1 ${
    //                   isPrimary ? "text-white/70" : "text-text-secondary"
    //                 }`}
    //               >
    //                 Balance
    //               </p>
    //               <p className="text-xl font-semibold">
    //                 {formatBalance(card.balance)}
    //               </p>
    //             </div>

    //             <Image
    //               src={isPrimary ? "/chip-white.svg" : "/chip-dark.svg"}
    //               alt="Card chip"
    //               width={32}
    //               height={24}
    //             />
    //           </div>

    //           <div className="flex items-end justify-between">
    //             <div>
    //               <p
    //                 className={`text-[10px] uppercase tracking-wide mb-0.5 ${
    //                   isPrimary ? "text-white/60" : "text-text-muted"
    //                 }`}
    //               >
    //                 Card Holder
    //               </p>
    //               <p className="text-sm font-medium">{card.cardHolder}</p>
    //             </div>
    //             <div>
    //               <p
    //                 className={`text-[10px] uppercase tracking-wide mb-0.5 ${
    //                   isPrimary ? "text-white/60" : "text-text-muted"
    //                 }`}
    //               >
    //                 Valid Thru
    //               </p>
    //               <p className="text-sm font-medium">{card.validThru}</p>
    //             </div>
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <p className="text-sm tracking-widest font-medium">
    //               {card.cardNumber}
    //             </p>
    //             <div className="flex -space-x-2">
    //               <div
    //                 className={`w-6 h-6 rounded-full ${
    //                   isPrimary ? "bg-white/40" : "bg-text-muted/40"
    //                 }`}
    //               />
    //               <div
    //                 className={`w-6 h-6 rounded-full ${
    //                   isPrimary ? "bg-white/70" : "bg-text-muted/70"
    //                 }`}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-heading">My Cards</h2>
        <button
          type="button"
          className="text-[17px] font-semibold text-heading cursor-pointer"
        >
          See All
        </button>
      </div>

      <div className="bg--color-background rounded-card p-6 ">
        <div className="flex gap-4 overflow-x-auto">
          {cards.map((card) => {
            const isPrimary = card.variant === "primary";

            return (
              <div
                key={card.id}
                className={`shrink-0 w-72 rounded-2xl p-5 flex flex-col justify-between h-44 ${
                  isPrimary
                    ? "bg-linear-to-br from-(--color-card-gradient-start) to-(--color-card-gradient-end) text-white"
                    : "bg-white border border-black/5 text-text-primary"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`text-xs mb-1 ${
                        isPrimary ? "text-white/70" : "text-text-secondary"
                      }`}
                    >
                      Balance
                    </p>
                    <p className="text-xl font-semibold">
                      {formatBalance(card.balance)}
                    </p>
                  </div>
                  <Image
                    src={isPrimary ? "/chip-white.svg" : "/chip-dark.svg"}
                    alt="Card chip"
                    width={32}
                    height={24}
                  />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className={`text-[10px] uppercase tracking-wide mb-0.5 ${
                        isPrimary ? "text-white/60" : "text-text-muted"
                      }`}
                    >
                      Card Holder
                    </p>
                    <p className="text-sm font-medium">{card.cardHolder}</p>
                  </div>
                  <div>
                    <p
                      className={`text-[10px] uppercase tracking-wide mb-0.5 ${
                        isPrimary ? "text-white/60" : "text-text-muted"
                      }`}
                    >
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
                    <div
                      className={`w-6 h-6 rounded-full ${
                        isPrimary ? "bg-white/40" : "bg-text-muted/40"
                      }`}
                    />
                    <div
                      className={`w-6 h-6 rounded-full ${
                        isPrimary ? "bg-white/70" : "bg-text-muted/70"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
