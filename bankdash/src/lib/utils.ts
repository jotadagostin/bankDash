export function formatCurrency(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const formatted = absValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return isNegative ? `-${formatted}` : `+${formatted}`;
}

export function formatBalance(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export function formatDate(dateString: string): string {
  return dateString;
}
