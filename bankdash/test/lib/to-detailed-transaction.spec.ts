import type { Transaction } from "@/core/domain/transactions/transaction.entity";
import { toDetailedTransaction } from "@/lib/to-detailed-transaction";

function makeTransaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: "t1",
    userId: "u1",
    description: "Spotify Subscription",
    transactionCode: "#12548796",
    category: "Shopping",
    cardLast4: "1234",
    amountInCents: 250000,
    direction: "expense",
    status: "pending",
    occurredAt: new Date("2021-01-28T00:30:00Z"),
    ...overrides,
  };
}

describe("toDetailedTransaction", () => {
  it("should map the fields to the table format", () => {
    expect(toDetailedTransaction(makeTransaction())).toEqual({
      id: "t1",
      description: "Spotify Subscription",
      transactionId: "#12548796",
      category: "Shopping",
      cardLast4: "1234",
      date: "28 Jan, 12:30 AM",
      amount: -2500,
      direction: "expense",
    });
  });

  it("should keep income amounts positive and convert cents to dollars", () => {
    const result = toDetailedTransaction(
      makeTransaction({ amountInCents: 75000, direction: "income" }),
    );

    expect(result.amount).toBe(750);
    expect(result.direction).toBe("income");
  });

  it("should format afternoon times in 12-hour format", () => {
    const result = toDetailedTransaction(
      makeTransaction({ occurredAt: new Date("2021-01-25T22:40:00Z") }),
    );

    expect(result.date).toBe("25 Jan, 10:40 PM");
  });

  it("should show noon as 12 PM and midnight as 12 AM", () => {
    const noon = toDetailedTransaction(
      makeTransaction({ occurredAt: new Date("2021-01-10T12:00:00Z") }),
    );
    const midnight = toDetailedTransaction(
      makeTransaction({ occurredAt: new Date("2021-01-10T00:00:00Z") }),
    );

    expect(noon.date).toBe("10 Jan, 12:00 PM");
    expect(midnight.date).toBe("10 Jan, 12:00 AM");
  });

  it("should pad single-digit days and minutes", () => {
    const result = toDetailedTransaction(
      makeTransaction({ occurredAt: new Date("2021-01-03T07:05:00Z") }),
    );

    expect(result.date).toBe("03 Jan, 07:05 AM");
  });
});
