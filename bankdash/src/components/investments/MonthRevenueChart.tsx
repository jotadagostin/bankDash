import { monthlyRevenue } from "@/data/mock-data";
import { LineChartCard } from "./LineChartCard";

export function MonthlyRevenueChart() {
  return (
    <LineChartCard
      title="Monthly Revenue"
      data={monthlyRevenue}
      color="var(--color-deposit)"
    />
  );
}
