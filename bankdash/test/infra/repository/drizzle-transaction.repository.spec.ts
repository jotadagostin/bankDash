/**
 * @jest-environment node
 */
import { DrizzleTransactionRepository } from "@/infra/repository/drizzle-transaction.repository";
import { transactions } from "@/lib/db/schema";

// Evita abrir a conexão real com o Neon ao importar o repository.
jest.mock("@/lib/db", () => ({ db: {} }));

type Database = ConstructorParameters<typeof DrizzleTransactionRepository>[0];

describe("DrizzleTransactionRepository", () => {
  // select().from().where().orderBy().limit().offset()  -> itens
  const offset = jest.fn();
  const limit = jest.fn(() => ({ offset }));
  const orderBy = jest.fn(() => ({ limit }));
  const whereItems = jest.fn(() => ({ orderBy }));
  const fromItems = jest.fn(() => ({ where: whereItems }));

  // select({ total }).from().where()  -> contagem
  const whereCount = jest.fn();
  const fromCount = jest.fn(() => ({ where: whereCount }));

  const select = jest.fn();

  const database = { select } as unknown as Database;
  const repository = new DrizzleTransactionRepository(database);

  const row = {
    id: "t1",
    userId: "u1",
    description: "Spotify Subscription",
    transactionCode: "#12548796",
    category: "Shopping",
    cardLast4: "1234",
    amountInCents: 250000,
    direction: "expense" as const,
    status: "pending" as const,
    occurredAt: new Date("2021-01-28T00:30:00Z"),
    createdAt: new Date("2021-01-28T00:30:00Z"),
  };

  beforeEach(() => {
    offset.mockReset();
    whereCount.mockReset();
    select.mockReset();
    limit.mockClear();
    orderBy.mockClear();
    whereItems.mockClear();
    fromItems.mockClear();
    fromCount.mockClear();

    // A ordem importa: o repository monta primeiro a query dos itens,
    // depois a da contagem.
    select
      .mockReturnValueOnce({ from: fromItems })
      .mockReturnValueOnce({ from: fromCount });
  });

  it("should return the items and the total", async () => {
    offset.mockResolvedValue([row]);
    whereCount.mockResolvedValue([{ total: 12 }]);

    const result = await repository.findByUser({
      userId: "u1",
      filter: "all",
      limit: 5,
      offset: 0,
    });

    expect(select).toHaveBeenCalledTimes(2);
    expect(fromItems).toHaveBeenCalledWith(transactions);
    expect(fromCount).toHaveBeenCalledWith(transactions);
    expect(orderBy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ items: [row], total: 12 });
  });

  it("should apply the limit and the offset", async () => {
    offset.mockResolvedValue([row]);
    whereCount.mockResolvedValue([{ total: 12 }]);

    await repository.findByUser({
      userId: "u1",
      filter: "all",
      limit: 5,
      offset: 10,
    });

    expect(limit).toHaveBeenCalledWith(5);
    expect(offset).toHaveBeenCalledWith(10);
  });

  it.each(["all", "income", "expense"] as const)(
    "should filter both the items and the count when the filter is %s",
    async (filter) => {
      offset.mockResolvedValue([row]);
      whereCount.mockResolvedValue([{ total: 1 }]);

      await repository.findByUser({
        userId: "u1",
        filter,
        limit: 5,
        offset: 0,
      });

      expect(whereItems).toHaveBeenCalledTimes(1);
      expect(whereCount).toHaveBeenCalledTimes(1);
    },
  );

  it("should return an empty list when there are no transactions", async () => {
    offset.mockResolvedValue([]);
    whereCount.mockResolvedValue([{ total: 0 }]);

    const result = await repository.findByUser({
      userId: "u1",
      filter: "all",
      limit: 5,
      offset: 0,
    });

    expect(result).toEqual({ items: [], total: 0 });
  });
});
