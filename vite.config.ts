import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub Pages hosts project sites below /<repository>/; local development stays at /.
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = repositoryName ? `/${repositoryName}/` : "/";

// https://vite.dev/config/
export default defineConfig({
  base,
  server: { host: "0.0.0.0", allowedHosts: true },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
