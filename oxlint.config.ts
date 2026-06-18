import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "vue", "promise"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  rules: {
    "eslint/no-unused-vars": "error",
    "eslint/prefer-const": "error",
    "eslint/no-console": "warn",
    "promise/no-return-wrap": "error",
  },
});
