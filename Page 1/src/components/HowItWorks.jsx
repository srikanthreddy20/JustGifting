const STEPS = [
  { n: "1", title: "Create a Page", text: "Set up a customized celebration page in under 2 minutes with details about the occasion and recipient.", accent: "bg-primary-fixed text-on-primary-fixed" },
  { n: "2", title: "Choose Gifts", text: "Curate a wishlist or let friends vote and suggest items they know the recipient will adore.", accent: "bg-secondary-fixed text-on-secondary-fixed" },
  { n: "3", title: "Gift Together", text: "Invite friends to contribute funds and write heartfelt messages bundled into a single delivery.", accent: "bg-tertiary-fixed text-on-tertiary-fixed" },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-space-md">
        <h2 className="font-headline-md text-headline-md md:text-headline-lg text-on-surface">How JustGifting Works</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Three simple steps to coordinate unforgettable gifts for the people you love.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
        {STEPS.map((s) => (
          <div key={s.n} className="bg-surface rounded-[20px] p-8 shadow-[0_4px_20px_rgba(124,92,231,0.06)] flex flex-col items-center text-center gap-space-md">
            <div className={`w-16 h-16 rounded-[20px] ${s.accent} flex items-center justify-center font-headline-md text-[24px] mb-space-sm`}>
              {s.n}
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{s.title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
