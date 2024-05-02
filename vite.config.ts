import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@api": "/src/api",
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@features": "/src/features",
      "@hooks": "/src/hooks",
      "@lang": "/src/lang",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
    },
  },
  plugins: [react()],
});
