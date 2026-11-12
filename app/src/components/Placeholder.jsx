// A labelled empty block marking where a section will be built, and in which week.
export default function Placeholder({ label, week, className = "" }) {
  return (
    <div className={`border-2 border-dashed border-outline-variant rounded-xl p-space-lg bg-surface-container-lowest ${className}`}>
      <p className="text-body-md text-on-surface">{label}</p>
      <p className="text-body-sm text-on-surface-variant mt-1">Planned for Week {week}</p>
    </div>
  );
}
