"use client";

import { debitCreditOverview } from "@/data/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function DebitCreditChart() {
  const totalDebit = debitCreditOverview.reduce((sum, d) => sum + d.debit, 0);
  const totalCredit = debitCreditOverview.reduce((sum, d) => sum + d.credit, 0);

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Debit &amp; Credit Overview
      </h2>

      <div className="bg-surface rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">
              ${totalDebit.toLocaleString("en-US")}
            </span>{" "}
            Debited &amp;{" "}
            <span className="font-semibold text-text-primary">
              ${totalCredit.toLocaleString("en-US")}
            </span>{" "}
            Credited in this Week
          </p>

          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              Debit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FE5C73]" />
              Credit
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={debitCreditOverview}
            barGap={6}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#EDF1F7" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#B1B1B1", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#B1B1B1", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            />
            <Bar
              dataKey="debit"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
              maxBarSize={12}
            />
            <Bar
              dataKey="credit"
              fill="#FE5C73"
              radius={[6, 6, 0, 0]}
              maxBarSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
