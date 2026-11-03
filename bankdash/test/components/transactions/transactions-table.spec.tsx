import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";

import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import type { FilterOption } from "@/components/transactions/transactions-filters";
import type { DetailedTransaction } from "@/types";

function makeTransaction(
  n: number,
  direction: "income" | "expense" = "income",
): DetailedTransaction {
  return {
    id: `t${n}`,
    description: `Transaction ${n}`,
    transactionId: `#TX${n}`,
    category: "Shopping",
    cardLast4: "1234",
    date: "28 Jan, 12:30 AM",
    amount: direction === "income" ? n * 100 : -n * 100,
    direction,
  };
}

type RenderOptions = {
  transactions?: DetailedTransaction[];
  filter?: FilterOption;
  page?: number;
  totalPages?: number;
  searchParams?: string;
};

function renderTable({
  transactions = [makeTransaction(1), makeTransaction(2, "expense")],
  filter = "all",
  page = 1,
  totalPages = 3,
  searchParams = "",
}: RenderOptions = {}) {
  const onUrlUpdate = jest.fn();

  render(
    <NuqsTestingAdapter
      searchParams={searchParams}
      onUrlUpdate={onUrlUpdate}
      hasMemory
    >
      <TransactionsTable
        transactions={transactions}
        filter={filter}
        page={page}
        totalPages={totalPages}
      />
    </NuqsTestingAdapter>,
  );

  return { onUrlUpdate };
}

function lastQueryString(onUrlUpdate: jest.Mock): string | undefined {
  const calls = onUrlUpdate.mock.calls;
  return calls[calls.length - 1]?.[0]?.queryString;
}

describe("TransactionsTable", () => {
  it("should render the title, the tabs and the column headers", () => {
    renderTable();

    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "All Transactions" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Income" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Expense" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual([
      "Description",
      "Transaction ID",
      "Type",
      "Card",
      "Date",
      "Amount",
      "Receipt",
    ]);
  });

  it("should render the transaction fields", () => {
    renderTable({ transactions: [makeTransaction(1)] });

    expect(screen.getByText("Transaction 1")).toBeInTheDocument();
    expect(screen.getByText("#TX1")).toBeInTheDocument();
    expect(screen.getByText("Shopping")).toBeInTheDocument();
    expect(screen.getByText("1234 ***")).toBeInTheDocument();
    expect(screen.getByText("28 Jan, 12:30 AM")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download" }),
    ).toBeInTheDocument();
  });

  it("should format the amounts and color them by direction", () => {
    renderTable({
      transactions: [makeTransaction(1), makeTransaction(2, "expense")],
    });

    expect(screen.getByText("+$100")).toHaveClass("text-deposit");
    expect(screen.getByText("-$200")).toHaveClass("text-withdraw");
  });

  it("should render only the header row when there are no transactions", () => {
    renderTable({ transactions: [], totalPages: 1 });

    expect(screen.getAllByRole("row")).toHaveLength(1);
    expect(screen.queryByText(/^Transaction \d+$/)).not.toBeInTheDocument();
  });

  it.each([
    ["all", "All Transactions"],
    ["income", "Income"],
    ["expense", "Expense"],
  ] as const)(
    "should highlight the active tab when the filter is %s",
    (filter, label) => {
      renderTable({ filter });

      expect(screen.getByRole("button", { name: label })).toHaveClass(
        "text-primary",
      );
    },
  );

  it("should render one button per page and highlight the current one", () => {
    renderTable({ page: 2, totalPages: 3 });

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "4" })).not.toBeInTheDocument();
  });

  it("should disable Previous on the first page", () => {
    renderTable({ page: 1, totalPages: 3 });

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  it("should disable Next on the last page", () => {
    renderTable({ page: 3, totalPages: 3 });

    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("should disable both navigation buttons when there is a single page", () => {
    renderTable({ page: 1, totalPages: 1 });

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("should update the filter in the URL when a tab is clicked", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable();

    await user.click(screen.getByRole("button", { name: "Income" }));

    await waitFor(() =>
      expect(lastQueryString(onUrlUpdate)).toContain("filter=income"),
    );
  });

  it("should go back to the first page when the filter changes", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable({ page: 2, searchParams: "?page=2" });

    await user.click(screen.getByRole("button", { name: "Expense" }));

    await waitFor(() => {
      const queryString = lastQueryString(onUrlUpdate);
      expect(queryString).toContain("filter=expense");
      expect(queryString).not.toContain("page=");
    });
  });

  it("should update the page in the URL when a page number is clicked", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable({ page: 1, totalPages: 3 });

    await user.click(screen.getByRole("button", { name: "3" }));

    await waitFor(() =>
      expect(lastQueryString(onUrlUpdate)).toContain("page=3"),
    );
  });

  it("should go to the next page when Next is clicked", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable({
      page: 2,
      totalPages: 3,
      searchParams: "?page=2",
    });

    await user.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() =>
      expect(lastQueryString(onUrlUpdate)).toContain("page=3"),
    );
  });

  it("should go to the previous page when Previous is clicked", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable({
      page: 3,
      totalPages: 3,
      searchParams: "?page=3",
    });

    await user.click(screen.getByRole("button", { name: "Previous" }));

    await waitFor(() =>
      expect(lastQueryString(onUrlUpdate)).toContain("page=2"),
    );
  });
});
