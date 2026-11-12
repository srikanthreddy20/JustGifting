import Icon from "@/components/Icon.jsx";
import { rupees } from "@/lib/format.js";

export default function ThankYouBanner({ donation, onDismiss }) {
  return (
    <div className="bg-tertiary-container rounded-2xl p-space-lg flex items-start gap-4 animate-fade-in">
      <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center shrink-0">
        <Icon name="mark_email_read" size={20} fill className="text-on-tertiary" />
      </div>
      <div className="flex-1">
        <p className="font-headline-sm text-on-tertiary-container">
          🎉 Thank you, {donation.donorName}!
        </p>
        <p className="text-body-md text-on-tertiary-container/80 mt-1">
          Your contribution of <strong>{rupees(donation.amount)}</strong> towards <em>{donation.giftTitle}</em> was recorded.
          A thank-you email was sent to <strong>{donation.donorEmail}</strong>.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-on-tertiary-container/10 transition-colors"
        aria-label="Dismiss"
      >
        <Icon name="close" size={18} className="text-on-tertiary-container" />
      </button>
    </div>
  );
}

