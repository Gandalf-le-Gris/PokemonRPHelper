import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "node", "promise", "vue"],
  categories: {
    correctness: 'error',
    suspicious: 'error',
  },
  rules: {
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/no-floating-promises': 'off',
  },
  settings: {},
  env: {
    builtin: true
  },
  globals: {},
  ignorePatterns: [],
  options: {
    typeAware: true,
  }
})
