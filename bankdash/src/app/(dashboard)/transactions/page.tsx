import { MyCards } from "@/components/dashboard/MyCards";
import { ExpenseChart } from "@/components/transactions/ExpenseChart";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { filterOptions } from "@/components/transactions/transactions-filters";
import { ListTransactionsUseCase } from "@/core/application/transaction/list-transactions.use-case";
import { DrizzleTransactionRepository } from "@/infra/repository/drizzle-transaction.repository";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { toDetailedTransaction } from "@/lib/to-detailed-transaction";
import { redirect } from "next/navigation";
import {
  createLoader,
  parseAsInteger,
  parseAsStringLiteral,
  type SearchParams,
} from "nuqs/server";
import { Suspense } from "react";

const loadSearchParams = createLoader({
  filter: parseAsStringLiteral(filterOptions).withDefault("all"),
  page: parseAsInteger.withDefault(1),
});

const listTransactions = new ListTransactionsUseCase(
  new DrizzleTransactionRepository(db),
);

type TransactionsPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { filter, page } = await loadSearchParams(searchParams);

  const result = await listTransactions.execute({
    userId: session.user.id,
    filter,
    page,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <MyCards />
        </div>
        <div>
          <ExpenseChart />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="h-96 bg-surface rounded-card shadow-card animate-pulse" />
        }
      >
        <TransactionsTable
          transactions={result.items.map(toDetailedTransaction)}
          filter={filter}
          page={result.page}
          totalPages={result.totalPages}
        />
      </Suspense>
    </>
  );
}
