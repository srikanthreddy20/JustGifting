import Icon from "@/components/Icon.jsx";
import { rupees } from "@/lib/format.js";

export default function RecipientSummary({ page, count, total }) {
  return (
    <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md">
        <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0"><Icon name="redeem" size={28} fill /></div>
        <div>
          <h2 className="font-headline-md text-on-surface">{page.title}</h2>
          <p className="text-body-md text-on-surface-variant">{page.interests} · Budget {rupees(page.budgetMin)} - {rupees(page.budgetMax)}</p>
        </div>
      </div>
      <div className="md:text-right">
        <div className="text-body-sm text-on-surface-variant">Selected Items</div>
        <div className="font-headline-sm text-primary" aria-live="polite">{count} {count === 1 ? "item" : "items"} ({rupees(total)})</div>
      </div>
    </div>
  );
}
