export interface CardData {
  id: string;
  balance: number;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  variant: "primary" | "secondary";
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  icon: "card" | "paypal" | "user";
}

export interface WeeklyActivityData {
  day: string;
  deposit: number;
  withdraw: number;
}

export interface ExpenseCategory {
  label: string;
  value: number;
  color: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface BalanceHistoryPoint {
  month: string;
  balance: number;
}

export interface DetailedTransaction {
  id: string;
  description: string;
  transactionId: string;
  category: string;
  cardLast4: string;
  date: string;
  amount: number;
  direction: "income" | "expense";
  status?: "Pending" | "Completed";
}

export interface SummaryCardData {
  label: string;
  value: number;
}

export interface Invoice {
  id: string;
  name: string;
  timeAgo: string;
  amount: number;
}

export interface DebidCreditPoint {
  day: string;
  debit: number;
  credit: number;
}

export interface InvestmentSummary {
  label: string;
  value: string;
}

export interface YearlyDataPoint {
  year: string;
  value: number;
}

export interface Investment {
  id: string;
  name: string;
  category: string;
  value: number;
  returnPercent: number;
}

export interface TrendingStock {
  id: string;
  slNo: string;
  name: string;
  price: number;
  returnPercent: number;
}

export interface LoanSummary {
  label: string;
  value: string;
}

export interface LoanRecord {
  id: string;
  slNo: string;
  loanMoney: number;
  leftToRepay: number;
  duration: string;
  interestRate: string;
  installment: string;
}
