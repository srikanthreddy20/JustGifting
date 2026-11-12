import Icon from "@/components/Icon.jsx";

export default function StatCard({ label, value, sub, icon }) {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_20px_rgba(124,92,231,0.06)] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-on-surface-variant font-medium">{label}</span>
        <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center"><Icon name={icon} size={18} /></div>
      </div>
      <div className="mt-4">
        <span className="block text-headline-md font-headline-md text-on-surface">{value}</span>
        <span className="block text-body-sm text-on-surface-variant mt-1">{sub}</span>
      </div>
    </div>
  );
}
