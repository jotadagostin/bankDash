export type TransactionDirection = "income" | "expense";
export type TransactionStatus = "pending" | "completed";

export type Transaction = {
  id: string;
  userId: string;
  description: string;
  transactionCode: string;
  category: string;
  cardLast4: string;
  amountInCents: number;
  direction: TransactionDirection;
  status: TransactionStatus | null;
  occurredAt: Date;
};
