import Icon from "@/components/Icon.jsx";

// `accent` controls the small icon chip color so each summary card has its own accent
// (matches the Stitch contributions_dashboard design).
const ACCENTS = {
  primary: { chip: "bg-primary-fixed text-on-primary-fixed", glow: "bg-primary/5 group-hover:bg-primary/10" },
  secondary: { chip: "bg-secondary-container text-on-secondary-container", glow: "bg-secondary/5 group-hover:bg-secondary/10" },
  tertiary: { chip: "bg-tertiary-fixed text-on-tertiary-fixed", glow: "bg-tertiary/5 group-hover:bg-tertiary/10" },
};

export default function StatCard({ label, value, sub, icon, accent = "primary" }) {
  const a = ACCENTS[accent] || ACCENTS.primary;
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_20px_rgba(124,92,231,0.06)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(124,92,231,0.12)] transition-all">
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${a.glow} rounded-full blur-xl transition-all`}></div>
      <div className="flex items-center justify-between relative z-10">
        <span className="text-body-sm text-on-surface-variant font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-full ${a.chip} flex items-center justify-center`}><Icon name={icon} size={18} /></div>
      </div>
      <div className="mt-4 relative z-10">
        <span className="block text-headline-md font-headline-md text-on-surface">{value}</span>
        <span className="block text-body-sm text-on-surface-variant mt-1">{sub}</span>
      </div>
    </div>
  );
}
