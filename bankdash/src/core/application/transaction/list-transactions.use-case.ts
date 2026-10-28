import { Transaction } from "@/core/domain/transactions/transaction.entity";
import {
  TransactionFilter,
  TransactionRepository,
} from "@/core/domain/transactions/transaction.repository";

const DEFAULT_PAGE_SIZE = 5;

export type ListTransactionsInput = {
  userId: string;
  filter?: TransactionFilter;
  page?: number;
  pageSize?: number;
};

export type ListTransactionsOutput = {
  items: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function positiveIntegerOr(value: number | undefined, fallback: number) {
  return value !== undefined && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

export class ListTransactionsUseCase {
  constructor(private readonly transactions: TransactionRepository) {}

  async execute({
    userId,
    filter = "all",
    page,
    pageSize,
  }: ListTransactionsInput): Promise<ListTransactionsOutput> {
    if (!userId.trim()) {
      throw new Error("USER_ID_REQUIRED");
    }

    const size = positiveIntegerOr(pageSize, DEFAULT_PAGE_SIZE);
    const requestedPage = positiveIntegerOr(page, 1);

    let result = await this.transactions.findByUser({
      userId,
      filter,
      limit: size,
      offset: (requestedPage - 1) * size,
    });

    const totalPages = Math.max(1, Math.ceil(result.total / size));
    const currentPage = Math.min(requestedPage, totalPages);

    // Página pedida além da última: busca de novo a última página,
    // o mesmo comportamento que a tabela já tinha no front.
    if (currentPage !== requestedPage) {
      result = await this.transactions.findByUser({
        userId,
        filter,
        limit: size,
        offset: (currentPage - 1) * size,
      });
    }

    return {
      items: result.items,
      total: result.total,
      page: currentPage,
      pageSize: size,
      totalPages,
    };
  }
}
