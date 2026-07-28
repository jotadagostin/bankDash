import { DebitCreditChart } from "@/components/accounts/DebitCreditChart";
import { InvoicesSent } from "@/components/accounts/InvoicesSent";
import { LastTransaction } from "@/components/accounts/LastTransactions";
import { SummaryCards } from "@/components/accounts/SummaryCards";

export default function Accounts() {
  return (
    <div>
      <SummaryCards />
      <LastTransaction />
      <DebitCreditChart />
      <InvoicesSent />
    </div>
  );
}
