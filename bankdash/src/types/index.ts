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
