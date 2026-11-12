import { Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar.jsx";

// Screens register themselves: every file in "Page N/src/screens" exports a default component and a `path`.
const modules = import.meta.glob("../../Page */src/screens/*.jsx", { eager: true });

// The public gifting page is also reachable by slug at /p/<slug>, so friends can
// open the shareable link that appears on the dashboard.
const PublicGiftingPage = modules["../../Page 5/src/screens/PublicGiftingPage.jsx"]?.default;

export default function App() {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto px-gutter py-space-xl">
        <Routes>
          {Object.values(modules).map((m) => <Route key={m.path} path={m.path} element={<m.default />} />)}
          {/* Friendly public URL: /p/<slug> renders the public gifting page */}
          {PublicGiftingPage && <Route path="/p/:slug" element={<PublicGiftingPage />} />}
          <Route path="*" element={<p>Screen not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
