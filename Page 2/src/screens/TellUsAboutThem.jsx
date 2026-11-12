import RecipientForm from "../components/RecipientForm.jsx";

export const path = "/tell-us-about-them";

export default function TellUsAboutThem() {
  return (
    <section>
      <h1 className="text-headline-lg font-headline-lg text-on-surface mb-1">Tell us about them</h1>
      <p className="text-body-lg text-on-surface-variant mb-space-lg">The more we know, the better the gift suggestions.</p>
      <RecipientForm />
    </section>
  );
}
