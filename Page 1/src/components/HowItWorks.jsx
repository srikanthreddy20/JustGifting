const STEPS = [
  ["1", "Create a Page", "Set up a customized celebration page in under 2 minutes with details about the occasion and recipient."],
  ["2", "Choose Gifts", "Curate a wishlist or let friends vote and suggest items they know the recipient will adore."],
  ["3", "Gift Together", "Invite friends to contribute funds and write heartfelt messages bundled into a single delivery."],
];

export default function HowItWorks() {
  return (
    <div className="py-space-lg">
      <h2 className="font-headline-md text-on-surface">How JustGifting Works</h2>
      <p className="text-body-md text-on-surface-variant mt-1 mb-space-lg">Three simple steps to coordinate unforgettable gifts for the people you love.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {STEPS.map(([n, title, text]) => (
          <div key={n} className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_4px_20px_rgba(124,92,231,0.06)]">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-headline-sm mb-space-md">{n}</div>
            <h3 className="font-headline-sm text-on-surface mb-1">{title}</h3>
            <p className="text-body-md text-on-surface-variant">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
