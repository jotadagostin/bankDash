import { DebitCreditChart } from "@/components/accounts/DebitCreditChart";
import { InvoicesSent } from "@/components/accounts/InvoicesSent";
import { LastTransaction } from "@/components/accounts/LastTransactions";
import { MyCard } from "@/components/accounts/MyCard";
import { SummaryCards } from "@/components/accounts/SummaryCards";

export default function Accounts() {
  return (
    <div className="flex flex-col gap-6">
      <SummaryCards />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LastTransaction />
        </div>
        <div>
          <MyCard />
        </div>
        <div className="md:col-span-2">
          <DebitCreditChart />
        </div>
        <div>
          <InvoicesSent />
        </div>
      </div>
    </div>
  );
}
