import { useState } from "react";
import Icon from "@/components/Icon.jsx";

const PRIORITIES = ["High Priority", "Nice to Have"];
const field = "w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-body-md focus:outline-none focus:ring-2 focus:ring-primary";
const label = "block text-label-md text-on-surface mb-1";

export default function AddGiftModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", price: "", shop: "", priority: "Nice to Have", reason: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    onAdd({
      title: form.title,
      description: form.description,
      price: parseInt(form.price, 10),
      shop: form.shop,
      priority: form.priority,
      reason: form.reason || "Added manually",
      img: null,
      selected: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-low rounded-2xl shadow-xl w-full max-w-lg p-space-lg animate-fade-in">
        <div className="flex items-center justify-between mb-space-md">
          <h2 className="font-headline-sm text-on-surface">Add a Gift</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
            <Icon name="close" size={20} />
          </button>
        </div>
        <form onSubmit={submit} className="grid gap-space-md">
          <div>
            <label className={label} htmlFor="ag-title">Gift name *</label>
            <input id="ag-title" className={field} value={form.title} onChange={set("title")} placeholder="e.g. Wireless Headphones" required />
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className={label} htmlFor="ag-price">Price in £ *</label>
              <input id="ag-price" inputMode="numeric" className={field} value={form.price} onChange={set("price")} placeholder="e.g. 5000" required />
            </div>
            <div>
              <label className={label} htmlFor="ag-priority">Priority</label>
              <select id="ag-priority" className={field} value={form.priority} onChange={set("priority")}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={label} htmlFor="ag-shop">Shop / Source</label>
            <input id="ag-shop" className={field} value={form.shop} onChange={set("shop")} placeholder="e.g. Amazon, Flipkart" />
          </div>
          <div>
            <label className={label} htmlFor="ag-desc">Description</label>
            <textarea id="ag-desc" rows={2} className={field} value={form.description} onChange={set("description")} placeholder="Short description..." />
          </div>
          <div>
            <label className={label} htmlFor="ag-reason">Why this gift?</label>
            <input id="ag-reason" className={field} value={form.reason} onChange={set("reason")} placeholder="e.g. Matches their love of music" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity">Add Gift</button>
          </div>
        </form>
      </div>
    </div>
  );
}

