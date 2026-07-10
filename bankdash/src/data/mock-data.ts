import type {
  CardData,
  Transaction,
  WeeklyActivityData,
  ExpenseCategory,
  Contact,
  BalanceHistoryPoint,
} from "@/types";

export const cards: CardData[] = [
  {
    id: "card-1",
    balance: 5756,
    cardHolder: "Eddy Cusuma",
    validThru: "12/22",
    cardNumber: "3778 **** **** 1234",
    variant: "primary",
  },
  {
    id: "card-2",
    balance: 5756,
    cardHolder: "Eddy Cusuma",
    validThru: "12/22",
    cardNumber: "3778 **** **** 1234",
    variant: "secondary",
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    name: "Deposit from my Card",
    date: "28 January 2021",
    amount: -850,
    type: "expense",
    icon: "card",
  },
  {
    id: "t2",
    name: "Deposit Paypal",
    date: "25 January 2021",
    amount: 2500,
    type: "income",
    icon: "paypal",
  },
  {
    id: "t3",
    name: "Jemi Wilson",
    date: "21 January 2021",
    amount: 5400,
    type: "income",
    icon: "user",
  },
];

export const weeklyActivity: WeeklyActivityData[] = [
  { day: "Sat", deposit: 480, withdraw: 350 },
  { day: "Sun", deposit: 200, withdraw: 90 },
  { day: "Mon", deposit: 350, withdraw: 250 },
  { day: "Tue", deposit: 480, withdraw: 320 },
  { day: "Wed", deposit: 160, withdraw: 110 },
  { day: "Thu", deposit: 480, withdraw: 190 },
  { day: "Fri", deposit: 480, withdraw: 350 },
];

export const expenseStatistics: ExpenseCategory[] = [
  { label: "Entertainment", value: 30, color: "var(--color-entertainment)" },
  { label: "Bill Expense", value: 15, color: "var(--color-bill-expense)" },
  { label: "Investment", value: 20, color: "var(--color-investment)" },
  { label: "Others", value: 35, color: "var(--color-others)" },
];

export const contacts: Contact[] = [
  {
    id: "c1",
    name: "Livia Bator",
    role: "CEO",
    avatarUrl: "/avatars/livia.jpg",
  },
  {
    id: "c2",
    name: "Randy Press",
    role: "Director",
    avatarUrl: "/avatars/randy.jpg",
  },
  {
    id: "c3",
    name: "Workman",
    role: "Designer",
    avatarUrl: "/avatars/workman.jpg",
  },
];

export const balanceHistory: BalanceHistoryPoint[] = [
  { month: "Jul", balance: 250 },
  { month: "Aug", balance: 450 },
  { month: "Sep", balance: 320 },
  { month: "Oct", balance: 780 },
  { month: "Nov", balance: 400 },
  { month: "Dec", balance: 550 },
  { month: "Jan", balance: 750 },
];
