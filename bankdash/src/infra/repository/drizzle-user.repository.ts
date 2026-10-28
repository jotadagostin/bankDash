import { and, count, desc, eq } from "drizzle-orm";

import {
  FindTransactionsParams,
  FindTransactionsResult,
  TransactionRepository,
} from "@/core/domain/transactions/transaction.repository";
import { db } from "@/lib/db";
import { transactions } from "@/lib/db/schema";

type Database = typeof db;

export class DrizzleTransactionRepository implements TransactionRepository {
  constructor(private readonly database: Database) {}

  async findByUser({
    userId,
    filter,
    limit,
    offset,
  }: FindTransactionsParams): Promise<FindTransactionsResult> {
    const where =
      filter === "all"
        ? eq(transactions.userId, userId)
        : and(
            eq(transactions.userId, userId),
            eq(transactions.direction, filter),
          );

    const [items, [{ total }]] = await Promise.all([
      this.database
        .select()
        .from(transactions)
        .where(where)
        .orderBy(desc(transactions.occurredAt), desc(transactions.id))
        .limit(limit)
        .offset(offset),
      this.database.select({ total: count() }).from(transactions).where(where),
    ]);

    return { items, total };
  }
}
