import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// The app shell lives in /app. Each screen lives in its own "Page N" folder (src/screens) and is
// registered automatically (see src/App.jsx). "@" points at app/src.
const nm = (p) => path.resolve(__dirname, "node_modules", p);
const pkg = (name) => ({ find: new RegExp(`^${name}(/.*)?$`), replacement: nm(name) + "$1" });

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      pkg("react"), pkg("react-dom"), pkg("react-router-dom"),   // let the Page folders use the app's packages
    ],
  },
  server: { port: 5173, fs: { allow: [path.resolve(__dirname, "..")] } },
});
