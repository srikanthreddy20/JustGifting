import PageShell from "@/components/PageShell.jsx";
import { useApp } from "@/context/AppContext.jsx";
import { fundingPercent, rupees } from "@/lib/format.js";
import StatCard from "../components/StatCard.jsx";
import Icon from "@/components/Icon.jsx";

export const path = "/contributions-dashboard";

export default function ContributionsDashboard() {
  const { gifts, pledged, donations } = useApp();
  const selected = gifts.filter((g) => g.selected);
  const budget = selected.reduce((s, g) => s + g.price, 0);
  const totalPledged = selected.reduce((s, g) => s + Math.min(pledged[g.id] || 0, g.price), 0);
  const funded = selected.filter((g) => (pledged[g.id] || 0) >= g.price).length;

  return (
    <PageShell title="Contributions dashboard" purpose="Creator view: how much of each gift is funded and recent donations.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <StatCard label="Total Gift Budget" icon="account_balance_wallet" value={rupees(budget)} sub="Target across all selected items" />
        <StatCard label="Total Pledged" icon="volunteer_activism" value={rupees(totalPledged)} sub={`${fundingPercent(totalPledged, budget)}% of total goal reached`} />
        <StatCard label="Remaining Amount" icon="trending_up" value={rupees(budget - totalPledged)} sub="Needed to fully fund all gifts" />
        <StatCard label="Fully Funded Gifts" icon="card_giftcard" value={`${funded} of ${selected.length}`} sub={`${funded} items completely secured`} />
      </div>

      {/* Gift progress list */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg">
        <h2 className="font-headline-sm text-on-surface mb-space-md">Gift progress</h2>
        <div className="grid gap-space-md">
          {selected.map((g) => {
            const gPledged = pledged[g.id] || 0;
            const pct = fundingPercent(gPledged, g.price);
            const isFunded = gPledged >= g.price;
            return (
              <div key={g.id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-md text-on-surface font-medium truncate">{g.title}</span>
                    <span className={`text-label-sm font-semibold ml-2 shrink-0 ${isFunded ? "text-tertiary" : "text-primary"}`}>{pct}%{isFunded ? " ✓" : ""}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${isFunded ? "bg-tertiary" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-label-sm text-on-surface-variant mt-1">
                    <span>{rupees(gPledged)} raised</span>
                    <span>{rupees(g.price)} goal</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Public link box */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-space-lg flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-headline-sm text-on-surface">Public gift page link</p>
          <p className="text-body-md text-on-surface-variant mt-1">Share this link with friends and family so they can contribute.</p>
          <code className="block mt-2 px-3 py-2 rounded-lg bg-surface-container text-body-sm text-primary font-mono break-all">
            http://localhost:5173/public-gifting-page
          </code>
        </div>
        <a
          href="/public-gifting-page"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity shrink-0"
        >
          <Icon name="open_in_new" size={16} />
          View Page
        </a>
      </div>

      {/* Recent donations */}
      <div className="bg-surface-container-low rounded-2xl p-space-lg">
        <h2 className="font-headline-sm text-on-surface mb-space-md">Recent contributions</h2>
        {donations.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">No contributions yet. Share the public page to get started!</p>
        ) : (
          <div className="grid gap-3">
            {[...donations].reverse().map((d) => {
              const gift = gifts.find((g) => g.id === d.giftId);
              return (
                <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                    <Icon name="volunteer_activism" size={18} fill className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md text-on-surface font-medium">{d.donorName} <span className="text-on-surface-variant font-normal">contributed</span> {rupees(d.amount)}</p>
                    <p className="text-body-sm text-on-surface-variant truncate">towards: {gift?.title || d.giftId}</p>
                    {d.message && <p className="text-body-sm text-on-surface-variant italic mt-0.5">"{d.message}"</p>}
                  </div>
                  <span className="text-label-sm text-on-surface-variant shrink-0">{new Date(d.ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
}
