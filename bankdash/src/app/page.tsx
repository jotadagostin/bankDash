import { MyCards } from "@/components/dashboard/MyCards";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="p-6">
          <MyCards />
        </main>
      </div>
    </div>
  );
}
