import Icon from "@/components/Icon.jsx";
import { rupees, fundingPercent } from "@/lib/format.js";

export default function AdminGiftRow({ gift, pledged, onToggle, onDelete }) {
  const pct = fundingPercent(pledged, gift.price);
  const funded = pledged >= gift.price;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl transition-colors ${gift.selected ? "bg-primary/5 border border-primary/20" : "bg-surface-container"}`}>
      {gift.img && (
        <img src={gift.img} alt={gift.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-body-md text-on-surface font-medium truncate">{gift.title}</p>
          <span className={`px-2 py-0.5 rounded-full text-label-sm font-semibold ${gift.priority === "High Priority" ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-on-surface-variant"}`}>{gift.priority}</span>
          {gift.selected && <span className="px-2 py-0.5 rounded-full text-label-sm font-semibold bg-primary-fixed text-on-primary-fixed">On Wishlist</span>}
        </div>
        <p className="text-body-sm text-on-surface-variant mt-0.5">{rupees(gift.price)}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${funded ? "bg-tertiary" : "bg-primary"}`} style={{ width: `${pct}%` }} />
          </div>
          <span className={`text-label-sm font-medium shrink-0 ${funded ? "text-tertiary" : "text-primary"}`}>{pct}%{funded ? " ✓" : ""}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onToggle}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-label-sm font-medium transition-colors ${gift.selected ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"}`}
        >
          <Icon name={gift.selected ? "visibility" : "visibility_off"} size={15} />
          {gift.selected ? "Listed" : "Hidden"}
        </button>
        <button
          onClick={onDelete}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors"
          aria-label="Delete gift"
        >
          <Icon name="delete" size={16} />
        </button>
      </div>
    </div>
  );
}

