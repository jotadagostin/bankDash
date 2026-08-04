import { ActiveLoansTable } from "@/components/loans/ActiveLoansTable";
import { LoanSummaryCards } from "@/components/loans/LoanSummaryCards";

export default function LoansPage() {
  return (
    <div className="flex flex-col gap-6">
      <LoanSummaryCards />
      <ActiveLoansTable />
    </div>
  );
}
