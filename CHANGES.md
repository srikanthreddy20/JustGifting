# Changes applied in this build

Two rounds of changes, both kept minimal. Login page (`Page 6`) untouched.

## Round 2 — Home page redesign + currency switch to £

### Home page (`Page 1/`)
- `Page 1/src/components/Hero.jsx` — rebuilt to match the Stitch `create_your_gifting_page` design:
  - "Social Gifting Simplified" pill with auto_awesome icon
  - Headline "Make their day a little more magical." + supporting copy
  - Two CTAs: "Create a Gifting Page" → /tell-us-about-them, "Explore a Gift Page" → /public-gifting-page
  - Social proof row: 3 overlapping avatar circles + "Trusted by over 15,000 celebration planners worldwide"
  - Decorative lavender + peach background blobs
  - **Right-side live preview card** showing the current campaign (Maya's 30th Birthday),
    funding progress bar, and the top 2 gifts by pledge amount with images + price chips.
- `Page 1/src/components/HowItWorks.jsx` — rebuilt to match the Stitch design:
  - Centered headline + subtitle
  - 3 step cards (Create a Page / Choose Gifts / Gift Together) with colored
    number badges (primary / secondary / tertiary) and rounded 20px cards.
- `Page 1/src/components/TrustSafety.jsx` (NEW) — replaces the old Placeholder:
  - "Safe, Secure & Transparent Gifting" trust card with verified_user icon.
- `Page 1/src/components/Footer.jsx` (NEW) — copyright + About / Privacy / Help links.
- `Page 1/src/screens/CreateGiftingPage.jsx` — composes Hero + HowItWorks +
  TrustSafety + Footer (no more Placeholder).
- Removed the now-unused `Placeholder` import from the home screen.
  (`Placeholder` itself is kept in `app/src/components/` for other screens.)

### NavBar (`app/src/components/NavBar.jsx`)
- Polished to match the Stitch design:
  - Logo box (card_giftcard icon in a primary-colored square) + brand name
  - Centered nav links with active state = primary-container pill (was a text-only underline)
  - Right side: "Draft" status chip + Curator button + person avatar
  - Sticky header with backdrop blur, max-w-7xl

### Layout (`app/src/App.jsx`)
- Main container widened from `max-w-5xl` → `max-w-7xl` so the home page
  matches the Stitch design's wider canvas.

### Currency: INR (₹) → GBP (£)
- `app/src/lib/format.js` — `money(n)` formats numbers as `£X,XXX` using
  `en-GB` locale. `rupees` is kept as a back-compat alias pointing to `money`
  so existing imports across all screens keep working.
- `Page 2/src/components/RecipientForm.jsx` — "Budget in ₹" → "Budget in £".
- `Page 3/src/components/AddGiftModal.jsx` — "Price in ₹" → "Price in £".
- `Page 5/src/components/DonateModal.jsx` — "Or enter amount (₹)" → "(£)".

Every money figure across the app now renders as £ automatically:
dashboard, public page, gift cards, donate modal, thank-you banner, admin panel.

## Round 1 — Earlier (still in this zip)

### `app/src/data/sampleData.js`
- Added `slug: "maya-30th"` to `samplePage` so a public shareable URL can be
  generated.

### `app/src/App.jsx`
- Added a friendly public route `/p/:slug` that renders the Public Gifting Page.
  Plus the `max-w-7xl` change from Round 2.

### `Page 4/src/screens/ContributionsDashboard.jsx`
- New header: "Look what we're making happen." / Creator Dashboard tagline.
- "Edit Gift List" + "Publish Page" action buttons (Publish toggles badge to Active).
- Public link box now generates a real URL: `${origin}/p/${slug}`.
- Working Copy button (clipboard + `execCommand` fallback) with Copied state.
- View Public Page link.
- Recent Contributions panel re-styled to match the Stitch design.

### `Page 4/src/components/StatCard.jsx`
- Optional `accent` prop (`primary` / `secondary` / `tertiary`) for per-card
  icon chip colors + soft hover glow, matching the Stitch design.

### `Page 5/src/screens/PublicGiftingPage.jsx`
- Fixed one broken inline style on the funding % label (was using
  `rgb(var(--color-tertiary))`, which is never defined — line was dead).
  Replaced with the Tailwind `text-tertiary` / `text-primary` classes.

## What was NOT touched
- `Page 6` (AdminPanel / login-as-curator) — left as-is per your instruction.
- `Page 2` form logic, `Page 3` gift grid, `Page 5` donate flow — only the
  currency label strings were switched from ₹ to £.
- Backend, database, docs, vercel.json — unchanged. (vercel.json already
  has a catch-all rewrite to `/index.html`, so `/p/<slug>` survives refresh.)
- Sample data contents (Maya's 30th Birthday, the 5 gifts, the pledges) —
  unchanged, only a `slug` field was added.

## How to test

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

Then:
1. **Home** (`/`) — should now look like your Stitch design: hero with the
   Maya preview card on the right, "How JustGifting Works" 3-step section,
   trust-and-safety card, footer. All amounts show as £.
2. **Contributions Dashboard** — generated public link
   `http://localhost:5173/p/maya-30th`, Copy button, View Public Page link.
3. **Public Gifting Page** (`/p/maya-30th` or `/public-gifting-page`) —
   Contribute flow shows £ amounts.
4. Click around — every rupee amount is now a pound amount.

Backend (FastAPI + Supabase) is unchanged and still optional for this
front-end-only test.
