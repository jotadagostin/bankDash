"use client";

import { weeklyActivity } from "@/data/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function WeeklyActivity() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Weekly Activity
      </h2>

      <div className="bg-surface rounded-card p-6 shadow-card">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={weeklyActivity}
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
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              formatter={(value) =>
                value === "deposit" ? "Diposit" : "Withdraw"
              }
              wrapperStyle={{ fontSize: 13, color: "#718EBF" }}
            />
            <Bar
              dataKey="deposit"
              fill="var(--color-deposit)"
              radius={[6, 6, 0, 0]}
              maxBarSize={12}
            />
            <Bar
              dataKey="withdraw"
              fill="var(--color-withdraw)"
              radius={[6, 6, 0, 0]}
              maxBarSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
