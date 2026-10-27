import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";

import { TransactionsTable } from "@/components/transactions/TransactionsTable";

// 12 transactions: 1-7 income, 8-12 expense (PAGE_SIZE = 5)
jest.mock("@/data/mock-data", () => ({
  detailedTransactions: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    description: `Transaction ${i + 1}`,
    transactionId: `#TX${i + 1}`,
    category: "Shopping",
    date: "28 Jan, 12.30 AM",
    direction: i < 7 ? "income" : "expense",
    amount: 100 + i,
  })),
}));

jest.mock("@/lib/utils", () => ({
  formatCurrency: (value: number) => `$${value}`,
}));

function range(from: number, to: number) {
  return Array.from(
    { length: to - from + 1 },
    (_, i) => `Transaction ${from + i}`,
  );
}

function visibleDescriptions() {
  return screen
    .getAllByText(/^Transaction \d+$/)
    .map((element) => element.textContent);
}

function renderTable(searchParams = "") {
  const onUrlUpdate = jest.fn();

  render(
    <NuqsTestingAdapter
      searchParams={searchParams}
      onUrlUpdate={onUrlUpdate}
      hasMemory
    >
      <TransactionsTable />
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

  it("should show the first page of all transactions by default", () => {
    renderTable();

    expect(visibleDescriptions()).toEqual(range(1, 5));
    expect(
      screen.getByRole("button", { name: "All Transactions" }),
    ).toHaveClass("text-primary");
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "4" })).not.toBeInTheDocument();
  });

  it("should format the amounts and color them by direction", () => {
    renderTable();

    expect(screen.getByText("$100")).toHaveClass("text-deposit");

    // transaction 8 is the first expense, so it is on page 2
    expect(screen.queryByText("$107")).not.toBeInTheDocument();
  });

  it("should color expense amounts as withdraw", async () => {
    const user = userEvent.setup();
    renderTable();

    await user.click(screen.getByRole("button", { name: "Expense" }));

    expect(await screen.findByText("$107")).toHaveClass("text-withdraw");
  });

  it("should filter by income", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable();

    await user.click(screen.getByRole("button", { name: "Income" }));

    await waitFor(() => expect(visibleDescriptions()).toEqual(range(1, 5)));
    expect(screen.getByRole("button", { name: "Income" })).toHaveClass(
      "text-primary",
    );
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "3" })).not.toBeInTheDocument();
    await waitFor(() =>
      expect(lastQueryString(onUrlUpdate)).toContain("filter=income"),
    );
  });

  it("should filter by expense and disable both navigation buttons", async () => {
    const user = userEvent.setup();
    renderTable();

    await user.click(screen.getByRole("button", { name: "Expense" }));

    await waitFor(() => expect(visibleDescriptions()).toEqual(range(8, 12)));
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("should navigate with the page numbers", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable();

    await user.click(screen.getByRole("button", { name: "2" }));

    await waitFor(() => expect(visibleDescriptions()).toEqual(range(6, 10)));
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("bg-primary");
    await waitFor(() =>
      expect(lastQueryString(onUrlUpdate)).toContain("page=2"),
    );
  });

  it("should navigate with Previous and Next", async () => {
    const user = userEvent.setup();
    renderTable();

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(visibleDescriptions()).toEqual(range(6, 10)));

    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(visibleDescriptions()).toEqual(range(11, 12)));
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Previous" }));
    await waitFor(() => expect(visibleDescriptions()).toEqual(range(6, 10)));
  });

  it("should go back to the first page when the filter changes", async () => {
    const user = userEvent.setup();
    const { onUrlUpdate } = renderTable("?page=2");

    expect(visibleDescriptions()).toEqual(range(6, 10));

    await user.click(screen.getByRole("button", { name: "Income" }));

    await waitFor(() => expect(visibleDescriptions()).toEqual(range(1, 5)));
    await waitFor(() => {
      const queryString = lastQueryString(onUrlUpdate);
      expect(queryString).toContain("filter=income");
      expect(queryString).not.toContain("page=");
    });
  });

  it("should read the filter and the page from the URL", () => {
    renderTable("?filter=income&page=2");

    expect(visibleDescriptions()).toEqual(range(6, 7));
    expect(screen.getByRole("button", { name: "Income" })).toHaveClass(
      "text-primary",
    );
  });

  it("should clamp a page beyond the last one to the last page", () => {
    renderTable("?page=99");

    expect(visibleDescriptions()).toEqual(range(11, 12));
    expect(screen.getByRole("button", { name: "3" })).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("should fall back to all transactions when the filter in the URL is invalid", () => {
    renderTable("?filter=banana");

    expect(visibleDescriptions()).toEqual(range(1, 5));
    expect(
      screen.getByRole("button", { name: "All Transactions" }),
    ).toHaveClass("text-primary");
  });
});
