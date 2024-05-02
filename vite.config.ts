import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@features": "/src/features",
      "@lang": "/src/lang",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
    },
  },
  plugins: [react()],
});
