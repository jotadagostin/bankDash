import type {
  CardData,
  Transaction,
  WeeklyActivityData,
  ExpenseCategory,
  Contact,
  BalanceHistoryPoint,
  DetailedTransaction,
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
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "c2",
    name: "Randy Press",
    role: "Director",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "c3",
    name: "Workman",
    role: "Designer",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: "c4",
    name: "Paula",
    role: "Front-end",
    avatarUrl: "https://i.pravatar.cc/150?img=34",
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

export interface MonthlyExpense {
  month: string;
  value: number;
}

export const monthlyExpense: MonthlyExpense[] = [
  { month: "Aug", value: 1800 },
  { month: "Sep", value: 2100 },
  { month: "Oct", value: 1600 },
  { month: "Nov", value: 2400 },
  { month: "Dec", value: 4600 },
  { month: "Jan", value: 2000 },
];

export const detailedTransactions: DetailedTransaction[] = [
  {
    id: "dt1",
    description: "Spotify Subscription",
    transactionId: "#12548796",
    category: "Shopping",
    cardLast4: "1234",
    date: "28 Jan, 12:30 AM",
    amount: -2500,
    direction: "expense",
  },
  {
    id: "dt2",
    description: "Freepik Sales",
    transactionId: "#12548796",
    category: "Transfer",
    cardLast4: "1234",
    date: "25 Jan, 10:40 PM",
    amount: 750,
    direction: "income",
  },
  {
    id: "dt3",
    description: "Mobile Service",
    transactionId: "#12548796",
    category: "Service",
    cardLast4: "1234",
    date: "20 Jan, 10:40 PM",
    amount: -150,
    direction: "expense",
  },
  {
    id: "dt4",
    description: "Wilson",
    transactionId: "#12548796",
    category: "Transfer",
    cardLast4: "1234",
    date: "15 Jan, 03:29 PM",
    amount: -1050,
    direction: "expense",
  },
  {
    id: "dt5",
    description: "Emilly",
    transactionId: "#12548796",
    category: "Transfer",
    cardLast4: "1234",
    date: "14 Jan, 10:40 PM",
    amount: 840,
    direction: "income",
  },
  {
    id: "dt6",
    description: "Netflix Subscription",
    transactionId: "#12548797",
    category: "Shopping",
    cardLast4: "1234",
    date: "12 Jan, 08:15 PM",
    amount: -1500,
    direction: "expense",
  },
  {
    id: "dt7",
    description: "Freelance Payment",
    transactionId: "#12548798",
    category: "Transfer",
    cardLast4: "1234",
    date: "10 Jan, 02:00 PM",
    amount: 3200,
    direction: "income",
  },
  {
    id: "dt8",
    description: "Electricity Bill",
    transactionId: "#12548799",
    category: "Service",
    cardLast4: "1234",
    date: "08 Jan, 09:00 AM",
    amount: -420,
    direction: "expense",
  },
  {
    id: "dt9",
    description: "Amazon Purchase",
    transactionId: "#12548800",
    category: "Shopping",
    cardLast4: "1234",
    date: "05 Jan, 06:45 PM",
    amount: -890,
    direction: "expense",
  },
  {
    id: "dt10",
    description: "Client Payment",
    transactionId: "#12548801",
    category: "Transfer",
    cardLast4: "1234",
    date: "03 Jan, 11:20 AM",
    amount: 5400,
    direction: "income",
  },
  {
    id: "dt11",
    description: "Internet Bill",
    transactionId: "#12548802",
    category: "Service",
    cardLast4: "1234",
    date: "01 Jan, 07:00 AM",
    amount: -300,
    direction: "expense",
  },
  {
    id: "dt12",
    description: "Steam Purchase",
    transactionId: "#12548803",
    category: "Shopping",
    cardLast4: "1234",
    date: "29 Dec, 09:15 PM",
    amount: -600,
    direction: "expense",
  },
  {
    id: "dt13",
    description: "Randy Press",
    transactionId: "#12548804",
    category: "Transfer",
    cardLast4: "1234",
    date: "27 Dec, 04:30 PM",
    amount: 1200,
    direction: "income",
  },
  {
    id: "dt14",
    description: "Gym Membership",
    transactionId: "#12548805",
    category: "Service",
    cardLast4: "1234",
    date: "24 Dec, 08:00 AM",
    amount: -800,
    direction: "expense",
  },
  {
    id: "dt15",
    description: "Livia Bator",
    transactionId: "#12548806",
    category: "Transfer",
    cardLast4: "1234",
    date: "20 Dec, 01:10 PM",
    amount: 2000,
    direction: "income",
  },
];
