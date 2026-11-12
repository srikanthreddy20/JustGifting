import Icon from "@/components/Icon.jsx";

export default function TrustSafety() {
  return (
    <section className="py-12">
      <div className="bg-surface-container-low rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-space-xl">
        <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
          <Icon name="verified_user" size={32} fill />
        </div>
        <div className="flex flex-col gap-space-xs text-center md:text-left">
          <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">Safe, Secure &amp; Transparent Gifting</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We use bank-grade encryption to protect all contributions. Organizers receive payouts seamlessly, and every participant can attach a personalized digital greeting card.
          </p>
        </div>
      </div>
    </section>
  );
}
