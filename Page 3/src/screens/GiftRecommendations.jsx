import { useState } from "react";
import PageShell from "@/components/PageShell.jsx";
import { useApp } from "@/context/AppContext.jsx";
import RecipientSummary from "../components/RecipientSummary.jsx";
import GiftCard from "../components/GiftCard.jsx";
import AddGiftModal from "../components/AddGiftModal.jsx";
import Icon from "@/components/Icon.jsx";

export const path = "/gift-recommendations";

export default function GiftRecommendations() {
  const { gifts, page, toggleGift, addGift, deleteGift } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const chosen = gifts.filter((g) => g.selected);

  return (
    <PageShell title="Gift recommendations" purpose="Suggested gifts ranked by priority — select, add or remove items.">
      <RecipientSummary page={page} count={chosen.length} total={chosen.reduce((s, g) => s + g.price, 0)} />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-body-md text-on-surface-variant">{gifts.length} gifts available · {chosen.length} selected</p>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity"
        >
          <Icon name="add" size={18} />
          Add Gift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {gifts.map((g) => (
          <GiftCard
            key={g.id}
            gift={g}
            onToggle={() => toggleGift(g.id)}
            onDelete={() => deleteGift(g.id)}
          />
        ))}
      </div>

      {showAdd && <AddGiftModal onClose={() => setShowAdd(false)} onAdd={(g) => { addGift(g); setShowAdd(false); }} />}
    </PageShell>
  );
}
