import type {
  CardData,
  Transaction,
  WeeklyActivityData,
  ExpenseCategory,
  Contact,
  BalanceHistoryPoint,
  DetailedTransaction,
  SummaryCardData,
  Invoice,
  DebidCreditPoint,
  InvestmentSummary,
  YearlyDataPoint,
  Investment,
  TrendingStock,
  LoanSummary,
  LoanRecord,
  ServiceHighlight,
  BankService,
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
    status: "Pending",
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
    status: "Completed",
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
    description: "Emilly Willson",
    transactionId: "#12548796",
    category: "Transfer",
    cardLast4: "1234",
    date: "14 Jan, 10:40 PM",
    amount: 840,
    direction: "income",
    status: "Completed",
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

export const summaryCards: SummaryCardData[] = [
  { label: "My Balance", value: 12750 },
  { label: "Income", value: 5600 },
  { label: "Expense", value: 3460 },
  { label: "Total Saving", value: 7920 },
];

export const invoices: Invoice[] = [
  { id: "inv1", name: "Apple Store", timeAgo: "5h ago", amount: 450 },
  { id: "inv2", name: "Michael", timeAgo: "2 days ago", amount: 160 },
  { id: "inv3", name: "Playstation", timeAgo: "5 days ago", amount: 1085 },
  { id: "inv4", name: "William", timeAgo: "10 days ago", amount: 90 },
];

export const debitCreditOverview: DebidCreditPoint[] = [
  { day: "Sat", debit: 800, credit: 550 },
  { day: "Sun", debit: 250, credit: 700 },
  { day: "Mon", debit: 200, credit: 350 },
  { day: "Tue", debit: 700, credit: 220 },
  { day: "Wed", debit: 320, credit: 550 },
  { day: "Thu", debit: 480, credit: 300 },
  { day: "Fri", debit: 750, credit: 480 },
];

export const investmentSummary: InvestmentSummary[] = [
  { label: "Total Invested Amount", value: "$150,000" },
  { label: "Number of Investments", value: "1,250" },
  { label: "Rate of Return", value: "+5.80%" },
];

export const yearlyInvestment: YearlyDataPoint[] = [
  { year: "2016", value: 5000 },
  { year: "2017", value: 22000 },
  { year: "2018", value: 15000 },
  { year: "2019", value: 38000 },
  { year: "2020", value: 18000 },
  { year: "2021", value: 24000 },
];

export const monthlyRevenue: YearlyDataPoint[] = [
  { year: "2016", value: 8000 },
  { year: "2017", value: 26000 },
  { year: "2018", value: 20000 },
  { year: "2019", value: 30000 },
  { year: "2020", value: 22000 },
  { year: "2021", value: 34000 },
];

export const myInvestments: Investment[] = [
  {
    id: "inv1",
    name: "Apple Store",
    category: "E-commerce, Marketplace",
    value: 54000,
    returnPercent: 16,
  },
  {
    id: "inv2",
    name: "Samsung Mobile",
    category: "E-commerce, Marketplace",
    value: 25300,
    returnPercent: -4,
  },
  {
    id: "inv3",
    name: "Tesla Motors",
    category: "Electric Vehicles",
    value: 8200,
    returnPercent: 25,
  },
];

export const trendingStocks: TrendingStock[] = [
  { id: "ts1", slNo: "01.", name: "Trivago", price: 520, returnPercent: 5 },
  { id: "ts2", slNo: "02.", name: "Canon", price: 480, returnPercent: 10 },
  { id: "ts3", slNo: "03.", name: "Uber Food", price: 350, returnPercent: -3 },
  { id: "ts4", slNo: "04.", name: "Nokia", price: 940, returnPercent: 2 },
  { id: "ts5", slNo: "05.", name: "Tiktok", price: 670, returnPercent: -12 },
];

export const cardExpenseStatistics: ExpenseCategory[] = [
  { label: "DBL Bank", value: 25, color: "#396AFF" },
  { label: "BRC Bank", value: 25, color: "#FE5C73" },
  { label: "ABM Bank", value: 25, color: "#16DBCC" },
  { label: "MCP Bank", value: 25, color: "#FFA800" },
];

export interface CreditCardListItem {
  id: string;
  type: string;
  bank: string;
  cardNumber: string;
  cardholderName: string;
}

export const creditCardList: CreditCardListItem[] = [
  {
    id: "cc1",
    type: "Secondary",
    bank: "DBL Bank",
    cardNumber: "**** **** 5600",
    cardholderName: "William",
  },
  {
    id: "cc2",
    type: "Secondary",
    bank: "BRC Bank",
    cardNumber: "**** **** 4300",
    cardholderName: "Michel",
  },
  {
    id: "cc3",
    type: "Secondary",
    bank: "ABM Bank",
    cardNumber: "**** **** 7560",
    cardholderName: "Edward",
  },
];

export interface CardSetting {
  id: string;
  title: string;
  description: string;
}

export const cardSettings: CardSetting[] = [
  { id: "cs1", title: "Block Card", description: "Instantly block your card" },
  {
    id: "cs2",
    title: "Change Pic Code",
    description: "Withdraw without any card",
  },
  {
    id: "cs3",
    title: "Add to Google Pay",
    description: "Withdraw without any card",
  },
  {
    id: "cs4",
    title: "Add to Apple Pay",
    description: "Withdraw without any card",
  },
  {
    id: "cs5",
    title: "Add to Apple Store",
    description: "Withdraw without any card",
  },
];

export const loanSummary: LoanSummary[] = [
  { label: "Personal Loans", value: "$50,000" },
  { label: "Corporate Loans", value: "$100,000" },
  { label: "Business Loans", value: "$500,000" },
  { label: "Custom Loans", value: "Choose Money" },
];

export const loanRecords: LoanRecord[] = [
  {
    id: "l1",
    slNo: "01.",
    loanMoney: 100000,
    leftToRepay: 40500,
    duration: "8 Months",
    interestRate: "12%",
    installment: "$2,000 / month",
  },
  {
    id: "l2",
    slNo: "02.",
    loanMoney: 500000,
    leftToRepay: 250000,
    duration: "36 Months",
    interestRate: "10%",
    installment: "$8,000 / month",
  },
  {
    id: "l3",
    slNo: "03.",
    loanMoney: 900000,
    leftToRepay: 40500,
    duration: "12 Months",
    interestRate: "12%",
    installment: "$5,000 / month",
  },
  {
    id: "l4",
    slNo: "04.",
    loanMoney: 50000,
    leftToRepay: 40500,
    duration: "25 Months",
    interestRate: "5%",
    installment: "$2,000 / month",
  },
  {
    id: "l5",
    slNo: "05.",
    loanMoney: 50000,
    leftToRepay: 40500,
    duration: "5 Months",
    interestRate: "16%",
    installment: "$10,000 / month",
  },
  {
    id: "l6",
    slNo: "06.",
    loanMoney: 80000,
    leftToRepay: 25500,
    duration: "14 Months",
    interestRate: "8%",
    installment: "$2,000 / month",
  },
  {
    id: "l7",
    slNo: "07.",
    loanMoney: 12000,
    leftToRepay: 5500,
    duration: "9 Months",
    interestRate: "13%",
    installment: "$500 / month",
  },
  {
    id: "l8",
    slNo: "08.",
    loanMoney: 160000,
    leftToRepay: 100800,
    duration: "3 Months",
    interestRate: "12%",
    installment: "$900 / month",
  },
];

export const serviceHighlights: ServiceHighlight[] = [
  { title: "Life Insurance", description: "Unlimited protection" },
  { title: "Shopping", description: "Buy. Think. Grow" },
  { title: "Safety", description: "We are your allies" },
];

export const bankServices: BankService[] = [
  {
    id: "bs1",
    name: "Business loans",
    description: "It is a long established",
  },
  {
    id: "bs2",
    name: "Checking accounts",
    description: "It is a long established",
  },
  {
    id: "bs3",
    name: "Savings accounts",
    description: "It is a long established",
  },
  {
    id: "bs4",
    name: "Debit and credit cards",
    description: "It is a long established",
  },
  {
    id: "bs5",
    name: "Life Insurance",
    description: "It is a long established",
  },
  {
    id: "bs6",
    name: "Business loans",
    description: "It is a long established",
  },
];
