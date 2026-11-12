export const rupees = (n) => "₹" + Math.round(Number(n) || 0).toLocaleString("en-IN");

// Funding % = min(pledged / target * 100, 100). Same rule as the backend and database.
export function fundingPercent(pledged, target) {
  if (!target || target <= 0) return 0;
  return Math.min(Math.round((pledged / target) * 100), 100);
}
