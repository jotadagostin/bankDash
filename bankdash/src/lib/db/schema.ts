import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactionDirection = pgEnum("transaction_direction", [
  "income",
  "expense",
]);

export const transactionStatus = pgEnum("transaction_status", [
  "pending",
  "completed",
]);

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    transactionCode: text("transaction_code").notNull(),
    category: text("category").notNull(),
    cardLast4: text("card_last4").notNull(),
    amountInCents: integer("amount_in_cents").notNull(),
    direction: transactionDirection("direction").notNull(),
    status: transactionStatus("status"),
    occurredAt: timestamp("occurred_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("transactions_user_occurred_idx").on(table.userId, table.occurredAt),
  ],
);
