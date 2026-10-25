import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/app/routeTree.gen.ts",
      routesDirectory: "./src/routes",
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@app": path.resolve(import.meta.dirname, "src/app"),
      "@components": path.resolve(import.meta.dirname, "src/components"),
      "@providers": path.resolve(import.meta.dirname, "src/app/providers"),
      "@pages": path.resolve(import.meta.dirname, "src/pages"),
      "@widgets": path.resolve(import.meta.dirname, "src/widgets"),
      "@features": path.resolve(import.meta.dirname, "src/features"),
      "@entities": path.resolve(import.meta.dirname, "src/entities"),
      "@shared": path.resolve(import.meta.dirname, "src/shared"),
    },
  },
});
