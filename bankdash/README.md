Stack defined

Next.js 15 (App Router) + TypeScript — consistency with your other projects
Tailwind CSS v4 — you already know it
Recharts — for 3 graphs (bar, pie, area). Simpler than Visx, more beautiful "out of the box" than pure Tremor
nuqs — period filters synchronized in the URL (ex: ?period=week)
Zustand — light global status (e.g. balance selected, card active)
Zod — form validation (Quick Transfer)
Suspense + skeleton — loading state on cards and graphics
Data mocked in structured JSON (not hardcoded in the component) — simulates a real API and makes it easier to exchange for fetch later

Build order (the one I would follow)

Phase 1 — Foundation

Project setup + Tailwind v4 with @theme (design colors: royal blue, purple, cyan, orange)
Base layout: fixed sidebar + content area with header (search, icons, avatar)
Overview page responsive grid (set breakpoints before any component)

Phase 2 — Static components (no dynamic data yet) 4. Sidebar with active state 5. Header (search bar, icons, avatar) 6. Cards "My Cards" (gradient + fixed mocked data) 7. Recent Transaction (simple list)

Phase 3 — Graphics 8. Weekly Activity (slash, Recharts) with mock data 9. Expense Statistics (donut, Recharts) with calculated captions 10. Balance History (area, Recharts) with mock data

Phase 4 — Real interactivity 11. Quick Transfer: avatar carousel + controlled input + Zod validation 12. Period filter (nuqs) connected to Weekly Activity and Balance History together 13. Skeleton loading with Suspense (simulate fetch delay)

Phase 5 — Polishing 14. Mobile responsiveness (sidebar becomes drawer/bottom nav) 15. Empty/error states (even if mocked, it shows maturity) 16. Second page (Transactions) with table + pagination, if it takes time

src/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── components/
│ ├── layout/ → Sidebar, Header
│ ├── dashboard/ → MyCards, RecentTransaction, WeeklyActivity, etc.
│ └── ui/ → botões, inputs reutilizáveis
├── data/
│ └── mock-data.ts → dados fake estruturados (transactions, cards, etc.)
├── lib/
│ └── utils.ts → helpers (formatação de moeda, data, etc.)
└── types/
└── index.ts → tipos TypeScript (Transaction, Card, etc.)
