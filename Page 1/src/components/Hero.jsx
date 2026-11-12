import { Link } from "react-router-dom";
import Icon from "@/components/Icon.jsx";

export default function Hero() {
  return (
    <div className="py-space-xl">
      <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-medium mb-space-md">
        <Icon name="auto_awesome" size={16} fill /> Social Gifting Simplified
      </div>
      <h2 className="font-headline-lg text-on-surface tracking-tight max-w-2xl">Make their day a little more magical.</h2>
      <p className="text-body-lg text-on-surface-variant mt-space-md max-w-xl">
        Bring your favorite people together to find the perfect gift, one thoughtful contribution at a time.
      </p>
      <div className="flex flex-wrap gap-space-md mt-space-lg">
        <Link to="/tell-us-about-them" className="px-6 py-3 rounded-xl bg-primary text-on-primary text-label-md font-medium shadow-sm hover:opacity-90 transition-opacity">Create a Gifting Page</Link>
        <Link to="/public-gifting-page" className="px-6 py-3 rounded-xl bg-surface-container-high text-on-surface text-label-md font-medium hover:bg-surface-container-highest transition-colors">Explore a Gift Page</Link>
      </div>
    </div>
  );
}
