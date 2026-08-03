import { AddCardForm } from "@/components/credit-cards/AddCardForm";
import { CardExpenseChart } from "@/components/credit-cards/CardExpenseChart";
import { CardList } from "@/components/credit-cards/CardList";
import { CardSettings } from "@/components/credit-cards/CardSettings";
import { MyCards } from "@/components/dashboard/MyCards";

export default function CreditCardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <MyCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardExpenseChart />
        <CardList />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddCardForm />
        <CardSettings />
      </div>
    </div>
  );
}
