// Format a number as British pounds. We keep `rupees` as a back-compat alias
// so existing imports across the app still render correctly after the
// INR → GBP currency switch.
export const money = (n) => "£" + Math.round(Number(n) || 0).toLocaleString("en-GB");

// Back-compat alias. Prefer `money` in new code.
export const rupees = money;

// Funding % = min(pledged / target * 100, 100). Same rule as the backend and database.
export function fundingPercent(pledged, target) {
  if (!target || target <= 0) return 0;
  return Math.min(Math.round((pledged / target) * 100), 100);
}
