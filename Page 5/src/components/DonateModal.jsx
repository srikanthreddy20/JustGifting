import { useState } from "react";
import Icon from "@/components/Icon.jsx";
import { rupees } from "@/lib/format.js";

const field = "w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-body-md focus:outline-none focus:ring-2 focus:ring-primary";
const label = "block text-label-md text-on-surface mb-1";

const AMOUNTS = [500, 1000, 2000, 5000];

export default function DonateModal({ gift, onClose, onDonate }) {
  const [form, setForm] = useState({ name: "", email: "", amount: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.amount) return;
    setSending(true);

    // Simulate API call delay (in real app: POST /donate to backend)
    await new Promise((r) => setTimeout(r, 1200));

    setSending(false);
    setSent(true);

    // Fire-and-forget after short pause to show success
    setTimeout(() => {
      onDonate({ donorName: form.name, donorEmail: form.email, amount: parseInt(form.amount, 10), message: form.message });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-low rounded-2xl shadow-xl w-full max-w-md p-space-lg">
        {sent ? (
          <div className="text-center py-space-lg">
            <div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center mx-auto mb-4">
              <Icon name="check_circle" size={36} fill className="text-tertiary" />
            </div>
            <h2 className="font-headline-sm text-on-surface mb-2">Thank you, {form.name}! 🎉</h2>
            <p className="text-body-md text-on-surface-variant">
              Your contribution of <strong>{rupees(parseInt(form.amount, 10))}</strong> towards <em>{gift.title}</em> has been recorded.
              A thank-you email is on its way to <strong>{form.email}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <h2 className="font-headline-sm text-on-surface">Contribute to this gift</h2>
                <p className="text-body-sm text-on-surface-variant mt-0.5">{gift.title}</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
                <Icon name="close" size={20} />
              </button>
            </div>
            <form onSubmit={submit} className="grid gap-space-md">
              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className={label} htmlFor="d-name">Your name *</label>
                  <input id="d-name" className={field} value={form.name} onChange={set("name")} placeholder="e.g. Priya" required />
                </div>
                <div>
                  <label className={label} htmlFor="d-email">Email *</label>
                  <input id="d-email" type="email" className={field} value={form.email} onChange={set("email")} placeholder="you@email.com" required />
                </div>
              </div>
              <div>
                <label className={label}>Quick amounts</label>
                <div className="flex flex-wrap gap-2">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setForm({ ...form, amount: String(a) })}
                      className={`px-4 py-2 rounded-xl text-label-md font-medium transition-colors ${form.amount === String(a) ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"}`}
                    >
                      {rupees(a)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={label} htmlFor="d-amount">Or enter amount (£) *</label>
                <input id="d-amount" inputMode="numeric" className={field} value={form.amount} onChange={set("amount")} placeholder="e.g. 1500" required />
              </div>
              <div>
                <label className={label} htmlFor="d-msg">Message (optional)</label>
                <textarea id="d-msg" rows={2} className={field} value={form.message} onChange={set("message")} placeholder="Write a heartfelt note..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancel</button>
                <button type="submit" disabled={sending} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60">
                  {sending ? <><Icon name="sync" size={16} className="animate-spin" />Sending...</> : <><Icon name="volunteer_activism" size={16} />Contribute</>}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

