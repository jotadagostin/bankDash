import { yearlyInvestment } from "@/data/mock-data";
import { LineChartCard } from "./LineChartCard";

export function YearlyInvestmentChart() {
  return (
    <LineChartCard
      title="Yearly Total Investment"
      data={yearlyInvestment}
      color="#FFA800"
    />
  );
}
