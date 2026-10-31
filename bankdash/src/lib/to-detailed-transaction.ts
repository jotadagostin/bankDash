import { Transaction } from "@/core/domain/transactions/transaction.entity";
import { DetailedTransaction } from "@/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Format in UTC so the result does not depend on the server's fuso.
// Example: "Jan 28, 12:30 AM"

function formatOccuredAt(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = MONTHS[date.getUTCMonth()];
  const hours24 = date.getUTCHours();
  const hours = String(hours24 % 12 || 12).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "PM" : "AM";

  return `${day} ${month}, ${hours}:${minutes} ${period}`;
}

export function toDetailedTransaction(
  transaction: Transaction,
): DetailedTransaction {
  const dollars = transaction.amountInCents / 100;

  return {
    id: transaction.id,
    description: transaction.description,
    transactionId: transaction.transactionCode,
    category: transaction.category,
    cardLast4: transaction.cardLast4,
    date: formatOccuredAt(transaction.occurredAt),
    amount: transaction.direction === "expense" ? -dollars : dollars,
    direction: transaction.direction,
  };
}
