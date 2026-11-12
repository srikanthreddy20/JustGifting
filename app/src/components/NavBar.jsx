import { NavLink } from "react-router-dom";
import Icon from "@/components/Icon.jsx";

const ITEMS = [
  ["Create Page", "/"],
  ["Recipient Profile", "/tell-us-about-them"],
  ["Gift Recommendations", "/gift-recommendations"],
  ["Dashboard", "/contributions-dashboard"],
  ["Public Page", "/public-gifting-page"],
];

export default function NavBar() {
  return (
    <header className="bg-surface-container-low border-b border-outline-variant/40 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-gutter py-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-headline-sm font-headline-sm text-on-surface">JustGifting</span>
        <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-1 items-center">
          {ITEMS.map(([label, to]) => (
            <NavLink key={to} to={to} end
              className={({ isActive }) => `text-body-md ${isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-on-surface"}`}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/admin" end
            className={({ isActive }) => `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-label-md font-medium transition-colors ${isActive ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"}`}>
            <Icon name="admin_panel_settings" size={15} />
            Curator
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
