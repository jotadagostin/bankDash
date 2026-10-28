import { eq } from "drizzle-orm";

import { db } from "./index";
import { transactions, users } from "./schema";

type SeedRow = {
  description: string;
  category: string;
  amount: number; // dólares, negativo = despesa (como no mock)
  occurredAt: string;
  status?: "pending" | "completed";
};

const rows: SeedRow[] = [
  {
    description: "Spotify Subscription",
    category: "Shopping",
    amount: -2500,
    occurredAt: "2021-01-28T00:30:00Z",
    status: "pending",
  },
  {
    description: "Freepik Sales",
    category: "Transfer",
    amount: 750,
    occurredAt: "2021-01-25T22:40:00Z",
  },
  {
    description: "Mobile Service",
    category: "Service",
    amount: -150,
    occurredAt: "2021-01-20T22:40:00Z",
    status: "completed",
  },
  {
    description: "Wilson",
    category: "Transfer",
    amount: -1050,
    occurredAt: "2021-01-15T15:29:00Z",
  },
  {
    description: "Emilly Willson",
    category: "Transfer",
    amount: 840,
    occurredAt: "2021-01-14T22:40:00Z",
    status: "completed",
  },
  {
    description: "Netflix Subscription",
    category: "Shopping",
    amount: -1500,
    occurredAt: "2021-01-12T20:15:00Z",
  },
  {
    description: "Freelance Payment",
    category: "Transfer",
    amount: 3200,
    occurredAt: "2021-01-10T14:00:00Z",
  },
  {
    description: "Electricity Bill",
    category: "Service",
    amount: -420,
    occurredAt: "2021-01-08T09:00:00Z",
  },
  {
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -890,
    occurredAt: "2021-01-05T18:45:00Z",
  },
  {
    description: "Client Payment",
    category: "Transfer",
    amount: 5400,
    occurredAt: "2021-01-03T11:20:00Z",
  },
  {
    description: "Internet Bill",
    category: "Service",
    amount: -300,
    occurredAt: "2021-01-01T07:00:00Z",
  },
  {
    description: "Steam Purchase",
    category: "Shopping",
    amount: -600,
    occurredAt: "2020-12-29T21:15:00Z",
  },
  {
    description: "Randy Press",
    category: "Transfer",
    amount: 1200,
    occurredAt: "2020-12-27T16:30:00Z",
  },
  {
    description: "Gym Membership",
    category: "Service",
    amount: -800,
    occurredAt: "2020-12-24T08:00:00Z",
  },
  {
    description: "Livia Bator",
    category: "Transfer",
    amount: 2000,
    occurredAt: "2020-12-20T13:10:00Z",
  },
];

async function main() {
  const email = process.argv[2];

  if (!email) {
    throw new Error("Usage: tsx seed-transactions.ts <user-email>");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new Error(`User not found: ${email}`);
  }

  // Seed idempotente: apaga as transações desse usuário e recria.
  await db.delete(transactions).where(eq(transactions.userId, user.id));

  await db.insert(transactions).values(
    rows.map((row, index) => ({
      userId: user.id,
      description: row.description,
      transactionCode: `#${12548796 + index}`,
      category: row.category,
      cardLast4: "1234",
      amountInCents: Math.abs(row.amount) * 100,
      direction: row.amount < 0 ? ("expense" as const) : ("income" as const),
      status: row.status ?? null,
      occurredAt: new Date(row.occurredAt),
    })),
  );

  console.log(`Seeded ${rows.length} transactions for ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
