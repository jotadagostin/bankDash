import { ListTransactionsUseCase } from "@/core/application/transaction/list-transactions.use-case";
import { Transaction } from "@/core/domain/transactions/transaction.entity";
import { TransactionRepository } from "@/core/domain/transactions/transaction.repository";

function makeTransaction(n: number): Transaction {
  return {
    id: `t${n}`,
    userId: "u1",
    description: `Transaction ${n}`,
    transactionCode: `#${n}`,
    category: "Shopping",
    cardLast4: "1234",
    amountInCents: n * 100,
    direction: "income",
    status: null,
    occurredAt: new Date("2021-01-01T00:00:00Z"),
  };
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) =>
    makeTransaction(from + i),
  );
}

describe("ListTransactionsUseCase", () => {
  const findByUser = jest.fn();
  const repository: TransactionRepository = { findByUser };
  let useCase: ListTransactionsUseCase;

  beforeEach(() => {
    findByUser.mockReset();
    useCase = new ListTransactionsUseCase(repository);
  });

  it("should return the first page with the default filter and page size", async () => {
    findByUser.mockResolvedValue({ items: range(1, 5), total: 12 });

    const result = await useCase.execute({ userId: "u1" });

    expect(findByUser).toHaveBeenCalledTimes(1);
    expect(findByUser).toHaveBeenCalledWith({
      userId: "u1",
      filter: "all",
      limit: 5,
      offset: 0,
    });
    expect(result).toEqual({
      items: range(1, 5),
      total: 12,
      page: 1,
      pageSize: 5,
      totalPages: 3,
    });
  });

  it("should compute the offset from the page", async () => {
    findByUser.mockResolvedValue({ items: range(6, 10), total: 12 });

    const result = await useCase.execute({ userId: "u1", page: 2 });

    expect(findByUser).toHaveBeenCalledWith({
      userId: "u1",
      filter: "all",
      limit: 5,
      offset: 5,
    });
    expect(result.page).toBe(2);
  });

  it("should forward the filter to the repository", async () => {
    findByUser.mockResolvedValue({ items: range(1, 2), total: 2 });

    await useCase.execute({ userId: "u1", filter: "income" });

    expect(findByUser).toHaveBeenCalledWith(
      expect.objectContaining({ filter: "income" }),
    );
  });

  it("should respect a custom page size", async () => {
    findByUser.mockResolvedValue({ items: range(11, 12), total: 12 });

    const result = await useCase.execute({
      userId: "u1",
      page: 2,
      pageSize: 10,
    });

    expect(findByUser).toHaveBeenCalledWith({
      userId: "u1",
      filter: "all",
      limit: 10,
      offset: 10,
    });
    expect(result.pageSize).toBe(10);
    expect(result.totalPages).toBe(2);
  });

  it("should clamp a page beyond the last one and fetch the last page", async () => {
    findByUser
      .mockResolvedValueOnce({ items: [], total: 12 })
      .mockResolvedValueOnce({ items: range(11, 12), total: 12 });

    const result = await useCase.execute({ userId: "u1", page: 99 });

    expect(findByUser).toHaveBeenCalledTimes(2);
    expect(findByUser).toHaveBeenLastCalledWith({
      userId: "u1",
      filter: "all",
      limit: 5,
      offset: 10,
    });
    expect(result.page).toBe(3);
    expect(result.items).toEqual(range(11, 12));
  });

  it.each([0, -1, 1.5, Number.NaN])(
    "should fall back to page 1 when the page is %p",
    async (page) => {
      findByUser.mockResolvedValue({ items: range(1, 5), total: 12 });

      const result = await useCase.execute({ userId: "u1", page });

      expect(findByUser).toHaveBeenCalledTimes(1);
      expect(findByUser).toHaveBeenCalledWith(
        expect.objectContaining({ offset: 0 }),
      );
      expect(result.page).toBe(1);
    },
  );

  it("should return a single empty page when there are no transactions", async () => {
    findByUser.mockResolvedValue({ items: [], total: 0 });

    const result = await useCase.execute({ userId: "u1" });

    expect(findByUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      items: [],
      total: 0,
      page: 1,
      pageSize: 5,
      totalPages: 1,
    });
  });

  it("should fail when the user id is blank", async () => {
    await expect(useCase.execute({ userId: "   " })).rejects.toThrow(
      "USER_ID_REQUIRED",
    );

    expect(findByUser).not.toHaveBeenCalled();
  });
});
