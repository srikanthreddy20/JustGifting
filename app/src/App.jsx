import { Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar.jsx";

// Screens register themselves: every file in "Page N/src/screens" exports a default component and a `path`.
const modules = import.meta.glob("../../Page */src/screens/*.jsx", { eager: true });

export default function App() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-gutter py-space-xl">
        <Routes>
          {Object.values(modules).map((m) => <Route key={m.path} path={m.path} element={<m.default />} />)}
          <Route path="*" element={<p>Screen not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
