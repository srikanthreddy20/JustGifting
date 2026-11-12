import Icon from "@/components/Icon.jsx";
import { rupees } from "@/lib/format.js";

export default function GiftCard({ gift, onToggle, onDelete }) {
  const high = gift.priority === "High Priority";
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(124,92,231,0.06)] flex flex-col justify-between relative group">
      {/* Delete button */}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Remove gift"
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-error-container text-on-error-container opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        >
          <Icon name="close" size={16} />
        </button>
      )}
      <div>
        <div className="relative h-48 bg-surface-container">
          {gift.img && <img className="w-full h-full object-cover" alt={gift.title} src={gift.img} />}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-label-sm font-semibold ${high ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-on-surface-variant"}`}>{gift.priority}</span>
        </div>
        <div className="p-space-lg">
          <p className="text-body-sm text-primary font-medium mb-1">{gift.reason}</p>
          <h3 className="font-headline-sm text-on-surface mb-2">{gift.title}</h3>
          <p className="text-body-md text-on-surface-variant line-clamp-2 mb-3">{gift.description}</p>
          <p className="flex items-center gap-2 text-body-sm text-on-surface-variant"><Icon name="storefront" size={16} className="text-primary" />{gift.shop}</p>
        </div>
      </div>
      <div className="p-space-lg pt-0 flex items-center justify-between">
        <div>
          <span className="text-body-sm text-on-surface-variant block">Estimated Price</span>
          <span className="font-headline-sm text-on-surface">{rupees(gift.price)}</span>
        </div>
        <button type="button" onClick={onToggle} aria-pressed={gift.selected}
          className={`px-4 py-2.5 rounded-xl text-label-md font-medium transition-colors ${gift.selected ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"}`}>
          {gift.selected ? "Selected ✓" : "Select"}
        </button>
      </div>
    </div>
  );
}
