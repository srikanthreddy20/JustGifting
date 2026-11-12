import { Link } from "react-router-dom";
import Icon from "@/components/Icon.jsx";
import { useApp } from "@/context/AppContext.jsx";
import { fundingPercent, money } from "@/lib/format.js";

const AVATARS = [
  { initials: "SO", cls: "bg-primary-fixed text-on-primary-fixed" },
  { initials: "MK", cls: "bg-secondary-fixed text-on-secondary-fixed" },
  { initials: "JD", cls: "bg-tertiary-fixed text-on-tertiary-fixed" },
];

export default function Hero() {
  const { gifts, page, pledged } = useApp();
  const selected = gifts.filter((g) => g.selected);
  const target = selected.reduce((s, g) => s + g.price, 0);
  const totalPledged = selected.reduce((s, g) => s + Math.min(pledged[g.id] || 0, g.price), 0);
  const pct = fundingPercent(totalPledged, target);
  // Top two gifts by pledge amount, for the preview card.
  const previewGifts = [...selected]
    .sort((a, b) => (pledged[b.id] || 0) - (pledged[a.id] || 0))
    .slice(0, 2);

  return (
    <section className="relative overflow-hidden py-space-xl md:py-16">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left: hero copy + CTAs + social proof */}
        <div className="lg:col-span-6 flex flex-col items-start gap-space-lg">
          <div className="inline-flex items-center gap-space-sm px-3 py-1.5 rounded-full bg-surface-container-high text-surface-tint text-label-md font-semibold">
            <Icon name="auto_awesome" size={18} fill />
            <span>Social Gifting Simplified</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
            Make their day a little more magical.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Bring your favorite people together to find the perfect gift, one thoughtful contribution at a time.
          </p>
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
            <Link
              to="/tell-us-about-them"
              className="w-full sm:w-auto inline-flex items-center justify-center px-space-xl py-4 rounded-[16px] bg-primary text-on-primary font-label-md hover:bg-surface-tint transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              Create a Gifting Page
            </Link>
            <Link
              to="/public-gifting-page"
              className="w-full sm:w-auto inline-flex items-center justify-center px-space-xl py-4 rounded-[16px] bg-surface-container-high text-on-surface font-label-md hover:bg-surface-container-highest transition-all"
            >
              Explore a Gift Page
            </Link>
          </div>
          <div className="flex items-center gap-space-md pt-space-md text-body-sm text-on-surface-variant">
            <div className="flex -space-x-2">
              {AVATARS.map((a) => (
                <div key={a.initials} className={`w-8 h-8 rounded-full ${a.cls} flex items-center justify-center font-bold text-[12px] border-2 border-background`}>
                  {a.initials}
                </div>
              ))}
            </div>
            <span>Trusted by over 15,000 celebration planners worldwide</span>
          </div>
        </div>

        {/* Right: live preview card */}
        <div className="lg:col-span-6">
          <div className="relative w-full rounded-[24px] overflow-hidden bg-surface-container-low shadow-xl p-6 border-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/20 via-transparent to-secondary-fixed/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-space-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-[16px] bg-primary text-on-primary flex items-center justify-center shadow-md">
                    <Icon name="cake" size={24} fill />
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{page.title}</h3>
                    <p className="font-body-sm text-on-surface-variant">Organized by Sarah Jenkins</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm font-medium bg-secondary-container text-on-secondary-container">
                  {money(totalPledged)} raised
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-3 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {previewGifts.map((g) => (
                  <div key={g.id} className="bg-surface rounded-[20px] p-4 shadow-sm flex flex-col justify-between gap-space-md">
                    {g.img && (
                      <div className="h-36 rounded-[12px] bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: `url('${g.img}')` }}>
                        <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-label-sm bg-surface/90 backdrop-blur-md text-on-surface font-semibold">
                          {money(g.price)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface truncate">{g.title}</h4>
                      <p className="font-body-sm text-on-surface-variant">
                        {Math.max(1, Math.floor((pledged[g.id] || 0) / Math.max(1, g.price) * 12))} contributors
                      </p>
                    </div>
                  </div>
                ))}
                {previewGifts.length === 0 && (
                  <p className="text-body-sm text-on-surface-variant md:col-span-2">No gifts selected yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
