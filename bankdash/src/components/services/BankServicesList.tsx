import { bankServices } from "@/data/mock-data";
import { Wallet } from "lucide-react";

const iconStyles = [
  { bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
  { bg: "bg-[#FFF3D6]", color: "text-[#E0A32E]" },
  { bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
  { bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" },
  { bg: "bg-[#DDF4E7]", color: "text-[#2FA36B]" },
  { bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" },
];

export function BankServicesList() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Bank Services List
      </h2>

      <div className="flex flex-col gap-4">
        {bankServices.map((service, index) => {
          const { bg, color } = iconStyles[index % iconStyles.length];

          return (
            <div
              key={service.id}
              className="bg-surface rounded-card p-4 shadow-card flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
              >
                <Wallet className="w-5 h-5" />
              </div>

              <div className="min-w-40">
                <p className="text-sm font-semibold text-text-primary">
                  {service.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {service.description}
                </p>
              </div>

              {/* Coloumn placeholder orignal design */}
              <span className="text-xs text-text-secondary hidden md:block w-24">
                Lorem Ipsum
                <br />
                Many publishing
              </span>
              <span className="text-xs text-text-secondary hidden md:block w-24">
                Lorem Ipsum
                <br />
                Many publishing
              </span>
              <span className="text-xs text-text-secondary hidden md:block w-24">
                Lorem Ipsum
                <br />
                Many publishing
              </span>

              <button
                type="button"
                className="ml-auto text-sm font-medium cursor-pointer text-primary border border-primary rounded-full px-5 py-1.5 hover:bg-primary-light transition-colors shrink-0"
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
