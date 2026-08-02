"use client";

import { cardExpenseStatistics } from "@/data/mock-data";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function CardExpenseChart() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Card Expense Statistics
      </h2>

      <div className="bg-surface rounded-card p-6 shadow-card">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={cardExpenseStatistics}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
            >
              {cardExpenseStatistics.map((entry) => (
                <Cell key={entry.label} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {cardExpenseStatistics.map((entry) => (
            <div key={entry.label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-text-secondary truncate">
                {entry.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
