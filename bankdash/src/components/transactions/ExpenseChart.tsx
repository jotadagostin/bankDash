"use client";

import { monthlyExpense } from "@/data/mock-data";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";

export function ExpenseChart() {
  const total = monthlyExpense.reduce((sum, item) => sum + item.value, 0);
  const highlightedMonth = "Dec";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-heading">My Expense</h2>
      </div>

      <div className="bg-surface rounded-card p-6 shadow-card">
        <p bg-surface rounded-card p-6 shadow-card>
          ${total.toLocaleString("es-US")}
        </p>

        <ResponsiveContainer width="100%" height={140}>
          <BarChart
            data={monthlyExpense}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#B1B1B1", fontSize: 11 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={14}>
              {monthlyExpense.map((entry) => (
                <Cell
                  key={entry.month}
                  fill={
                    entry.month === highlightedMonth
                      ? "var(--color-deposit)"
                      : "#DFEAF2"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
