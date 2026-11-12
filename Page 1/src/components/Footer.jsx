export default function Footer() {
  return (
    <footer className="mt-auto py-12 flex flex-col sm:flex-row items-center justify-between gap-space-md text-body-sm text-on-surface-variant">
      <div className="flex items-center gap-space-md">
        <span className="font-headline-sm text-on-surface">JustGifting</span>
        <span>© 2024 All rights reserved.</span>
      </div>
      <div className="flex items-center gap-space-lg">
        <a className="hover:text-on-surface transition-colors" href="#">About</a>
        <a className="hover:text-on-surface transition-colors" href="#">Privacy</a>
        <a className="hover:text-on-surface transition-colors" href="#">Help</a>
      </div>
    </footer>
  );
}
