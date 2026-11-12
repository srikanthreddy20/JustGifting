import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AGE_RANGES = ["Under 13", "13-17", "18-24", "25-34", "35-49", "50-64", "65+"];
const OCCASIONS = ["Birthday", "Wedding", "Housewarming", "Baby shower", "Graduation", "Other"];
const field = "w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-body-md focus:outline-none focus:ring-2 focus:ring-primary";
const label = "block text-label-md text-on-surface mb-1";

export default function RecipientForm() {
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", age: "25-34", occasion: "Birthday", interests: "", budget: "", date: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); navigate("/gift-recommendations"); }} className="bg-surface-container-low rounded-2xl p-space-lg grid gap-space-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div>
          <label className={label} htmlFor="r-name">Their name or nickname</label>
          <input id="r-name" className={field} value={f.name} onChange={set("name")} placeholder="e.g. Maya" />
        </div>
        <div>
          <label className={label} htmlFor="r-age">Age range</label>
          <select id="r-age" className={field} value={f.age} onChange={set("age")}>{AGE_RANGES.map((a) => <option key={a}>{a}</option>)}</select>
        </div>
        <div>
          <label className={label} htmlFor="r-occ">Occasion</label>
          <select id="r-occ" className={field} value={f.occasion} onChange={set("occasion")}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</select>
        </div>
        <div>
          <label className={label} htmlFor="r-int">Interests</label>
          <input id="r-int" className={field} value={f.interests} onChange={set("interests")} placeholder="e.g. coffee, art, travel" />
        </div>
        <div>
          <label className={label} htmlFor="r-bud">Budget in £ (optional)</label>
          <input id="r-bud" inputMode="numeric" className={field} value={f.budget} onChange={set("budget")} placeholder="e.g. 15000" />
        </div>
        <div>
          <label className={label} htmlFor="r-date">Event date (optional)</label>
          <input id="r-date" type="date" className={field} value={f.date} onChange={set("date")} />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity">Find Their Perfect Gifts</button>
      </div>
    </form>
  );
}
