"use client";

import { detailedTransactions } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";

const filterOptions = ["all", "income", "expense"] as const;
const PAGE_SIZE = 5;

const tabs: { value: (typeof filterOptions)[number]; label: string }[] = [
  { value: "all", label: "All Transactions" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

export function TransactionsTable() {
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsStringLiteral(filterOptions).withDefault("all"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const filtered =
    filter === "all"
      ? detailedTransactions
      : detailedTransactions.filter((t) => t.direction === filter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleFilterChange(value: (typeof filterOptions)[number]) {
    setFilter(value);
    setPage(1); // volta pra primeira página sempre que o filtro muda
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Recent Transactions
      </h2>

      <div className="bg-surface rounded-card shadow-card overflow-hidden">
        {/* tabs */}
        <div className="flex items-center gap-6 px-6 pt-5 border-b border-black/5">
          {tabs.map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleFilterChange(tab.value)}
                className={`pb-3 text-sm font-medium border-b-2 cursor-pointer transition-colors ${
                  isActive
                    ? "text-primary border-primary"
                    : "text-text-secondary border-transparent hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* horizontal scroll table mobile screen */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-160">
            <thead>
              <tr className="text-left text-xs text-text-secondary">
                <th className="font-medium px-6 py-4">Description</th>
                <th className="font-medium px-6 py-4">Transaction ID</th>
                <th className="font-medium px-6 py-4">Type</th>
                <th className="font-medium px-6 py-4">Card</th>
                <th className="font-medium px-6 py-4">Amount</th>
                <th className="font-medium px-6 py-4">Amount</th>
                <th className="font-medium px-6 py-4">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-black/5 text-sm"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          transaction.direction === "income"
                            ? "bg-[#DDF4E7] text-[#2FA36B]"
                            : "bg-[#FFE8EC] text-[#FE5C73]"
                        }`}
                      >
                        {transaction.direction === "income" ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <span className="font-medium text-text-primary">
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {transaction.transactionId}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {transaction.category}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">1234 ***</td>
                  <td className="px-4 py-4 text-text-secondary">
                    {transaction.date}
                  </td>
                  <td
                    className={`px-4 py-4 font-semibold ${
                      transaction.direction === "income"
                        ? "text-deposit"
                        : "text-withdraw"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="text-xs font-medium text-primary border cursor-pointer border-primary rounded-full px-4 py-1.5 hover:bg-primary-light transition-colors"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 px-6 py-5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="text-sm text-text-secondary disabled:opacity-40 disabled:cursor-not-allowed px-2 cursor-pointer"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-md cursor-pointer text-sm font-medium transition-colors ${
                p === currentPage
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-primary-light"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="text-sm text-text-secondary disabled:opacity-40 disabled:cursor-not-allowed px-2 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
