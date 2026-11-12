// Common layout for every screen skeleton: title, one-line purpose, then the page's sections.
export default function PageShell({ title, purpose, children }) {
  return (
    <section>
      <h1 className="text-headline-lg font-headline-lg text-on-surface mb-1">{title}</h1>
      <p className="text-body-lg text-on-surface-variant mb-space-lg">{purpose}</p>
      <div className="grid gap-space-md">{children}</div>
    </section>
  );
}
