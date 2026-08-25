export function formatPrice(val?: string | number) {
  if (!val) return "0.00";
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? "0.00" : num.toFixed(2);
}

export function formatDiscount(val?: string | number) {
  if (!val) return "HOT DEAL";
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? `${val}% OFF` : `${Math.round(num)}% OFF`;
}

export function formatDigits(val: number) {
  return String(val).padStart(2, "0");
}

export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatUpcomingDate(dateStr?: string) {
  if (!dateStr) return "STARTS SOON";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "STARTS SOON";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

