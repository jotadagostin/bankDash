"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { expenseStatistics } from "@/data/mock-data";

// Recharts passes these props to the custom label function.

// cx/cy = center of the chart, midAngle = mid-angle of the slice,
// innerRadius/outerRadius = radii of the slice.

// We use the official Recharts type (PieLabelRenderProps) because the fields
// come as string | number internally in the library.

function renderCustomLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, name } = props;

  const cxNum = Number(cx);
  const cyNum = Number(cy);
  const innerRadiusNum = Number(innerRadius);
  const outerRadiusNum = Number(outerRadius);
  const midAngleNum = Number(midAngle);

  // Posiciona o texto a ~65% do caminho entre o centro e a borda da fatia
  const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 0.65;
  const RADIAN = Math.PI / 180;
  const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
  const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#ffffff"
      fontSize={13}
    >
      <tspan x={x} dy="-0.4em" fontWeight={700}>
        {value}%
      </tspan>
      <tspan x={x} dy="1.3em" fontSize={11} fontWeight={400}>
        {name}
      </tspan>
    </text>
  );
}

export function ExpenseStatistics() {
  return (
    <div>
      <h2 className="font-bold text-text-primary mb-4">Expense Statistics</h2>

      <div className="bg-surface rounded-card p-6 shadow-card flex items-center justify-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={expenseStatistics}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={100}
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
              label={renderCustomLabel}
              labelLine={false}
            >
              {expenseStatistics.map((entry) => (
                <Cell key={entry.label} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
