import { useState } from "react";
import PageShell from "@/components/PageShell.jsx";
import { useApp } from "@/context/AppContext.jsx";
import { fundingPercent, rupees } from "@/lib/format.js";
import StatCard from "../components/StatCard.jsx";
import Icon from "@/components/Icon.jsx";

export const path = "/contributions-dashboard";

export default function ContributionsDashboard() {
  const { gifts, page, pledged, donations } = useApp();
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);

  const selected = gifts.filter((g) => g.selected);
  const budget = selected.reduce((s, g) => s + g.price, 0);
  const totalPledged = selected.reduce((s, g) => s + Math.min(pledged[g.id] || 0, g.price), 0);
  const funded = selected.filter((g) => (pledged[g.id] || 0) >= g.price).length;

  // Generate the public shareable URL from the page slug.
  // After real login lands (later milestone), this slug comes from the server.
  const slug = page.slug || "your-celebration";
  const publicUrl = `${window.location.origin}/p/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = publicUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 2200);
  };

  return (
    <PageShell
      title="Look what we're making happen."
      purpose="Creator Dashboard — your events, gift progress and the public link to share with friends and family."
    >
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-end gap-space-md">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-high text-on-surface text-label-md font-medium hover:bg-surface-container-highest transition-colors"
        >
          <Icon name="edit" size={18} />
          Edit Gift List
        </button>
        <button
          type="button"
          onClick={handlePublish}
          className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-[0_4px_16px_rgba(99,65,204,0.24)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Icon name="rocket_launch" size={18} />
          Publish Page
        </button>
        {published && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-medium">
            <Icon name="check_circle" size={14} fill />
            Page published
          </span>
        )}
      </div>

      {/* Summary cards (bento) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <StatCard label="Total Gift Budget" icon="account_balance_wallet" value={rupees(budget)} sub="Target across all selected items" />
        <StatCard label="Total Pledged" icon="volunteer_activism" value={rupees(totalPledged)} sub={`${fundingPercent(totalPledged, budget)}% of total goal reached`} accent="secondary" />
        <StatCard label="Remaining Amount" icon="trending_up" value={rupees(budget - totalPledged)} sub="Needed to fully fund all gifts" accent="tertiary" />
        <StatCard label="Fully Funded Gifts" icon="card_giftcard" value={`${funded} of ${selected.length}`} sub={`${funded} items completely secured`} accent="primary" />
      </div>

      {/* Gift progress list */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(124,92,231,0.06)]">
        <div className="flex items-center justify-between mb-space-md">
          <h2 className="font-headline-sm text-on-surface">Gift Progress Overview</h2>
          <span className="text-body-sm text-on-surface-variant">{selected.length} active items</span>
        </div>
        <div className="grid gap-space-md">
          {selected.length === 0 && (
            <p className="text-body-md text-on-surface-variant">No gifts selected yet. Head to Gift Recommendations to pick a few.</p>
          )}
          {selected.map((g) => {
            const gPledged = pledged[g.id] || 0;
            const pct = fundingPercent(gPledged, g.price);
            const isFunded = gPledged >= g.price;
            return (
              <div key={g.id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-md text-on-surface font-medium truncate">{g.title}</span>
                    <span className={`text-label-sm font-semibold ml-2 shrink-0 ${isFunded ? "text-primary" : "text-primary"}`}>{pct}%{isFunded ? " ✓" : ""}</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${isFunded ? "bg-primary" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-label-sm text-on-surface-variant mt-1">
                    <span>{rupees(gPledged)} pledged</span>
                    <span>{rupees(g.price)} target</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Public gifting link — generated from the page slug */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(124,92,231,0.06)] flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-on-surface">Public Gifting Link</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-medium bg-primary-fixed text-on-primary-fixed">
            {published ? "Active" : "Draft"}
          </span>
        </div>
        <p className="text-body-md text-on-surface-variant">Share this link with friends and family so they can contribute to your celebration.</p>
        <div className="flex items-center gap-space-xs bg-surface-container-low p-1.5 rounded-xl">
          <input
            readOnly
            type="text"
            value={publicUrl}
            className="bg-transparent border-none text-body-md text-on-surface px-2.5 py-1.5 w-full focus:outline-none truncate"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-space-md py-2 rounded-lg bg-primary text-on-primary text-label-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Icon name={copied ? "check" : "content_copy"} size={16} fill={copied} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <a
          href="/public-gifting-page"
          className="w-full py-2.5 px-space-md rounded-xl bg-surface-container-high text-on-surface text-label-md font-medium hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
        >
          <Icon name="visibility" size={18} />
          View Public Page
        </a>
      </div>

      {/* Recent donations */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(124,92,231,0.06)]">
        <div className="flex items-center justify-between mb-space-md">
          <h2 className="font-headline-sm text-on-surface">Recent Contributions</h2>
          <span className="text-body-sm text-primary font-medium">{donations.length} pledges</span>
        </div>
        {donations.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">No contributions yet. Share the public page to get started!</p>
        ) : (
          <div className="grid gap-3">
            {[...donations].reverse().map((d) => {
              const gift = gifts.find((g) => g.id === d.giftId);
              return (
                <div key={d.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                    <Icon name="volunteer_activism" size={18} fill className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md text-on-surface font-medium">{d.donorName} <span className="text-on-surface-variant font-normal">contributed</span> {rupees(d.amount)}</p>
                    <p className="text-body-sm text-on-surface-variant truncate">towards: {gift?.title || d.giftId}</p>
                    {d.message && <p className="text-body-sm text-on-surface-variant italic mt-0.5">&ldquo;{d.message}&rdquo;</p>}
                  </div>
                  <span className="text-label-sm text-on-surface-variant shrink-0">{new Date(d.ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="flex items-center justify-center gap-2 text-center text-body-sm text-outline pt-space-sm">
        <Icon name="info" size={16} />
        <p>This prototype records simulated contribution pledges only.</p>
      </div>
    </PageShell>
  );
}
