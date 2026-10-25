import { defineConfig } from "oxlint";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig({
  plugins: ["react", "typescript", "oxc"],
  jsPlugins: ["@tanstack/eslint-plugin-query"],
  rules: {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["off", { allowConstantExport: true }],
    ...pluginQuery.configs.recommended.rules,
  },
});
