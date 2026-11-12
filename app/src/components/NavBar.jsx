import { NavLink } from "react-router-dom";
import Icon from "@/components/Icon.jsx";

const ITEMS = [
  ["Create Page", "/"],
  ["Recipient Profile", "/tell-us-about-them"],
  ["Gift Recommendations", "/gift-recommendations"],
  ["Contributions Dashboard", "/contributions-dashboard"],
  ["Public Gifting Page", "/public-gifting-page"],
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-surface-container-high/60">
      <div className="max-w-7xl mx-auto px-gutter h-20 flex items-center justify-between">
        {/* Logo + brand */}
        <div className="flex items-center gap-space-md">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
            <Icon name="card_giftcard" size={18} fill />
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">JustGifting</span>
        </div>

        {/* Primary nav (desktop) */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-space-lg">
          {ITEMS.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-body-md transition-colors px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: status + avatar + admin */}
        <div className="flex items-center gap-space-md">
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-medium bg-surface-container-high text-on-surface-variant">
            Draft
          </span>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-label-md font-medium transition-colors ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              }`
            }
          >
            <Icon name="admin_panel_settings" size={15} />
            Curator
          </NavLink>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" size={18} className="text-on-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
