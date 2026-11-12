import { useState } from "react";
import { useApp } from "@/context/AppContext.jsx";
import { rupees, fundingPercent } from "@/lib/format.js";
import Icon from "@/components/Icon.jsx";
import AdminGiftRow from "../components/AdminGiftRow.jsx";

export const path = "/admin";

const ADMIN_KEY = "justgifting-admin-2024";

export default function AdminPanel() {
  const { gifts, page, pledged, donations, addGift, deleteGift, toggleGift } = useApp();
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState("overview"); // overview | gifts | donations | settings

  const login = (e) => {
    e.preventDefault();
    if (key === ADMIN_KEY) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-surface-container-low rounded-2xl p-space-xl w-full max-w-sm shadow-xl">
          <div className="flex flex-col items-center mb-space-lg">
            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-3">
              <Icon name="admin_panel_settings" size={28} fill className="text-primary" />
            </div>
            <h1 className="font-headline-sm text-on-surface">Curator Login</h1>
            <p className="text-body-sm text-on-surface-variant mt-1 text-center">Enter your admin key to manage the application.</p>
          </div>
          <form onSubmit={login} className="grid gap-4">
            <div>
              <label className="block text-label-md text-on-surface mb-1" htmlFor="admin-key">Admin Key</label>
              <input
                id="admin-key"
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your admin key"
                required
              />
              {authError && <p className="text-error text-label-sm mt-1">Incorrect admin key. Try: justgifting-admin-2024</p>}
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity">
              Sign In as Curator
            </button>
          </form>
        </div>
      </div>
    );
  }

  const selected = gifts.filter((g) => g.selected);
  const totalBudget = selected.reduce((s, g) => s + g.price, 0);
  const totalPledged = selected.reduce((s, g) => s + Math.min(pledged[g.id] || 0, g.price), 0);

  const TABS = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "gifts", label: "Manage Gifts", icon: "card_giftcard" },
    { id: "donations", label: "Contributions", icon: "volunteer_activism" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  return (
    <div className="grid gap-space-lg">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
            <Icon name="admin_panel_settings" size={20} fill className="text-primary" />
          </div>
          <div>
            <h1 className="font-headline-sm text-on-surface">Curator Panel</h1>
            <p className="text-body-sm text-on-surface-variant">Full control over {page.title}</p>
          </div>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <Icon name="logout" size={16} />
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/40 pb-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-label-md font-medium rounded-t-xl transition-colors border-b-2 ${
              tab === t.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Icon name={t.icon} size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === "overview" && (
        <div className="grid gap-space-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {[
              { label: "Total Gifts", value: gifts.length, icon: "inventory_2", sub: `${selected.length} selected` },
              { label: "Campaign Budget", value: rupees(totalBudget), icon: "account_balance_wallet", sub: "Selected gifts total" },
              { label: "Total Raised", value: rupees(totalPledged), icon: "volunteer_activism", sub: `${fundingPercent(totalPledged, totalBudget)}% funded` },
              { label: "Contributions", value: donations.length, icon: "people", sub: "Donor count" },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-low rounded-2xl p-space-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={s.icon} size={18} className="text-primary" />
                  <span className="text-label-md text-on-surface-variant">{s.label}</span>
                </div>
                <p className="font-headline-md text-on-surface">{s.value}</p>
                <p className="text-body-sm text-on-surface-variant mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Campaign health */}
          <div className="bg-surface-container-low rounded-2xl p-space-lg">
            <h2 className="font-headline-sm text-on-surface mb-space-md">Campaign Health</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-body-md text-on-surface-variant">Overall funding progress</span>
              <span className="font-headline-sm text-primary">{fundingPercent(totalPledged, totalBudget)}%</span>
            </div>
            <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${fundingPercent(totalPledged, totalBudget)}%` }} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-space-md text-center">
              {[
                { label: "Not started", count: selected.filter((g) => !(pledged[g.id])).length, color: "text-on-surface-variant" },
                { label: "In progress", count: selected.filter((g) => pledged[g.id] && pledged[g.id] < g.price).length, color: "text-primary" },
                { label: "Fully funded", count: selected.filter((g) => (pledged[g.id] || 0) >= g.price).length, color: "text-tertiary" },
              ].map((s) => (
                <div key={s.label}>
                  <p className={`font-headline-sm ${s.color}`}>{s.count}</p>
                  <p className="text-label-sm text-on-surface-variant">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gifts tab */}
      {tab === "gifts" && (
        <div className="bg-surface-container-low rounded-2xl p-space-lg">
          <div className="flex items-center justify-between mb-space-md flex-wrap gap-3">
            <h2 className="font-headline-sm text-on-surface">All Gifts ({gifts.length})</h2>
            <span className="text-body-sm text-on-surface-variant">{selected.length} currently on the wishlist</span>
          </div>
          <div className="grid gap-3">
            {gifts.map((g) => (
              <AdminGiftRow
                key={g.id}
                gift={g}
                pledged={pledged[g.id] || 0}
                onToggle={() => toggleGift(g.id)}
                onDelete={() => deleteGift(g.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Donations tab */}
      {tab === "donations" && (
        <div className="bg-surface-container-low rounded-2xl p-space-lg">
          <h2 className="font-headline-sm text-on-surface mb-space-md">All Contributions ({donations.length})</h2>
          {donations.length === 0 ? (
            <div className="text-center py-space-xl">
              <Icon name="volunteer_activism" size={40} className="text-on-surface-variant mx-auto mb-3" />
              <p className="text-body-md text-on-surface-variant">No contributions yet.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {[...donations].reverse().map((d) => {
                const gift = gifts.find((g) => g.id === d.giftId);
                return (
                  <div key={d.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-container">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                      <Icon name="person" size={20} fill className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-md text-on-surface font-medium">{d.donorName}</p>
                      <p className="text-body-sm text-on-surface-variant">{d.donorEmail}</p>
                      <p className="text-body-sm text-on-surface-variant">→ {gift?.title || "Unknown gift"}</p>
                      {d.message && <p className="text-body-sm italic text-on-surface-variant mt-1">"{d.message}"</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-headline-sm text-primary">{rupees(d.amount)}</p>
                      <p className="text-label-sm text-on-surface-variant mt-0.5 flex items-center gap-1 justify-end">
                        <Icon name="mark_email_read" size={14} className="text-tertiary" />
                        Email sent
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Settings tab */}
      {tab === "settings" && (
        <div className="grid gap-space-md">
          <div className="bg-surface-container-low rounded-2xl p-space-lg">
            <h2 className="font-headline-sm text-on-surface mb-space-md">Page Settings</h2>
            <div className="grid gap-space-md">
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container">
                <div>
                  <p className="text-body-md text-on-surface font-medium">Published</p>
                  <p className="text-body-sm text-on-surface-variant">Make the gift page visible to the public</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-on-primary rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container">
                <div>
                  <p className="text-body-md text-on-surface font-medium">Thank-you emails</p>
                  <p className="text-body-sm text-on-surface-variant">Auto-send email when someone contributes</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-on-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-error-container/30 border border-error/20 rounded-2xl p-space-lg">
            <h2 className="font-headline-sm text-error mb-2">Danger Zone</h2>
            <p className="text-body-md text-on-surface-variant mb-4">These actions are irreversible. The full delete flow connects to the backend admin API.</p>
            <button className="px-5 py-2.5 rounded-xl bg-error text-on-error text-label-md font-medium hover:opacity-90 transition-opacity">
              Delete Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

