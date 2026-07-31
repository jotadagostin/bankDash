import { InvestmentSummaryCards } from "@/components/investments/InvestmentSummaryCards";
import { MonthlyRevenueChart } from "@/components/investments/MonthRevenueChart";
import { MyInvestmentList } from "@/components/investments/MyInvestmentList";
import { TrendingStockTable } from "@/components/investments/Trendingstocktable";
import { YearlyInvestmentChart } from "@/components/investments/YearlyInvestmentChart";

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <InvestmentSummaryCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <YearlyInvestmentChart />
        <MonthlyRevenueChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MyInvestmentList />
        <TrendingStockTable />
      </div>
    </div>
  );
}
