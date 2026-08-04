import { BankServicesList } from "@/components/services/BankServicesList";
import { ServiceHighLights } from "@/components/services/ServiceHighLights";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <ServiceHighLights />
      <BankServicesList />
    </div>
  );
}
