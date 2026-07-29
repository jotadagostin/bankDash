// Simple mapping by name, since the mock doesn't have its own category
// for invoice (it's just name + time + value). Generic fallback for any
// name that doesn't match the special cases (assumes it's a person).

import { invoices } from "@/data/mock-data";
import { Gamepad2, ShoppingBag, User } from "lucide-react";

function getInvoiceIcon(name: string) {
  if (name.toLowerCase().includes("apple")) {
    return { icon: ShoppingBag, bg: "bg-[#DDF4E7]", color: "text-[#2FA36B]" };
  }
  if (name.toLowerCase().includes("playstation")) {
    return { icon: Gamepad2, bg: "bg-[#E9E5FF]", color: "text-[#5B4FE9]" };
  }
  return { icon: User, bg: "bg-[#FFE0E9]", color: "text-[#FE5C73]" };
}

export function InvoicesSent() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-heading">
          Invoices Sent
        </h2>
        <button
          type="button"
          className="text-sm font-medium text-heading hover:text-primary transition-colors cursor-pointer"
        >
          See All
        </button>
      </div>

      <div className="bg-surface rounded-card p-4 shadow-card flex flex-col gap-4">
        {invoices.map((invoice) => {
          const { icon: Icon, bg, color } = getInvoiceIcon(invoice.name);

          return (
            <div key={invoice.id} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
              >
                <Icon />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {invoice.name}
                </p>
                <p className="text-xs text-text-secondary">{invoice.timeAgo}</p>
              </div>

              <p className="text-sm font-semibold text-text-primary shrink-0">
                ${invoice.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
