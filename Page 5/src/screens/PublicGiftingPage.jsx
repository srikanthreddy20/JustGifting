import { useState } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { rupees, fundingPercent } from "@/lib/format.js";
import Icon from "@/components/Icon.jsx";
import DonateModal from "../components/DonateModal.jsx";
import ThankYouBanner from "../components/ThankYouBanner.jsx";

export const path = "/public-gifting-page";

export default function PublicGiftingPage() {
  const { gifts, page, pledged, recordDonation } = useApp();
  const selectedGifts = gifts.filter((g) => g.selected);
  const totalTarget = selectedGifts.reduce((s, g) => s + g.price, 0);
  const totalPledged = selectedGifts.reduce((s, g) => s + Math.min(pledged[g.id] || 0, g.price), 0);
  const overallPercent = fundingPercent(totalPledged, totalTarget);

  const [donating, setDonating] = useState(null); // gift object
  const [lastDonation, setLastDonation] = useState(null);

  const handleDonate = (donation) => {
    recordDonation({ ...donation, giftId: donating.id });
    setLastDonation({ ...donation, giftTitle: donating.title });
    setDonating(null);
  };

  return (
    <div className="grid gap-space-lg">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl p-space-xl text-center">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-space-md">
          <Icon name="redeem" size={32} fill className="text-primary" />
        </div>
        <h1 className="text-headline-lg font-headline-lg text-on-surface">{page.title}</h1>
        <p className="text-body-lg text-on-surface-variant mt-2 max-w-md mx-auto">
          {page.interests} · Help make this occasion unforgettable!
        </p>
        <div className="mt-space-md inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed/60 text-on-primary-fixed text-label-md font-medium">
          <Icon name="favorite" size={16} fill />
          {selectedGifts.length} gifts on the wishlist
        </div>
      </div>

      {/* Campaign progress */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-label-md text-on-surface-variant">Total pledged</p>
            <p className="font-headline-md text-primary">{rupees(totalPledged)} <span className="text-body-md text-on-surface-variant font-normal">of {rupees(totalTarget)}</span></p>
          </div>
          <div className="text-right">
            <p className="font-headline-md text-on-surface">{overallPercent}%</p>
            <p className="text-label-md text-on-surface-variant">funded</p>
          </div>
        </div>
        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="text-body-sm text-on-surface-variant mt-2">{selectedGifts.filter((g) => (pledged[g.id] || 0) >= g.price).length} of {selectedGifts.length} gifts fully funded</p>
      </div>

      {/* Thank you banner */}
      {lastDonation && (
        <ThankYouBanner donation={lastDonation} onDismiss={() => setLastDonation(null)} />
      )}

      {/* Wishlist gift cards */}
      <h2 className="font-headline-sm text-on-surface">Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {selectedGifts.map((g) => {
          const giftPledged = pledged[g.id] || 0;
          const pct = fundingPercent(giftPledged, g.price);
          const funded = giftPledged >= g.price;
          return (
            <div key={g.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(124,92,231,0.06)] flex flex-col">
              {g.img && (
                <div className="relative h-40 bg-surface-container">
                  <img className="w-full h-full object-cover" alt={g.title} src={g.img} />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-label-sm font-semibold ${g.priority === "High Priority" ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-on-surface-variant"}`}>{g.priority}</span>
                </div>
              )}
              <div className="p-space-lg flex flex-col flex-1">
                <p className="text-body-sm text-primary font-medium mb-1">{g.reason}</p>
                <h3 className="font-headline-sm text-on-surface mb-1">{g.title}</h3>
                <p className="text-body-md text-on-surface-variant line-clamp-2 mb-3">{g.description}</p>

                {/* Funding progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-label-sm text-on-surface-variant mb-1">
                    <span>{rupees(giftPledged)} raised</span>
                    <span>{rupees(g.price)} goal</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${funded ? "bg-tertiary" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-label-sm mt-1 font-medium" style={{ color: funded ? "rgb(var(--color-tertiary))" : undefined }}>{pct}% funded{funded ? " ✓ Fully Funded!" : ""}</p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="font-headline-sm text-on-surface">{rupees(g.price)}</span>
                  {!funded ? (
                    <button
                      onClick={() => setDonating(g)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <Icon name="volunteer_activism" size={16} />
                      Contribute
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-tertiary-container text-on-tertiary-container text-label-md font-medium">
                      <Icon name="check_circle" size={16} fill />
                      Funded!
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donate modal */}
      {donating && (
        <DonateModal
          gift={donating}
          onClose={() => setDonating(null)}
          onDonate={handleDonate}
        />
      )}
    </div>
  );
}
