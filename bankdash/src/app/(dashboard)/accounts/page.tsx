import { DebitCreditChart } from "@/components/accounts/DebitCreditChart";
import { LastTransaction } from "@/components/accounts/LastTransactions";
import { SummaryCards } from "@/components/accounts/SummaryCards";

export default function Accounts() {
  return (
    <div>
      <SummaryCards />
      <LastTransaction />
      <DebitCreditChart />
    </div>
  );
}
