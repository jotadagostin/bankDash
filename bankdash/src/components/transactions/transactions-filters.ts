export const filterOptions = ["all", "income", "expense"] as const;

export type FilterOption = (typeof filterOptions)[number];
