import { Transaction } from "./transaction.entity";

export type TransactionFilter = "all" | "income" | "expense";

export type FindTransactionsParams = {
  userId: string;
  filter: TransactionFilter;
  limit: number;
  offset: number;
};

export type FindTransactionsResult = {
  items: Transaction[];
  total: number;
};

export interface TransactionRepository {
  findByUser(params: FindTransactionsParams): Promise<FindTransactionsResult>;
}
