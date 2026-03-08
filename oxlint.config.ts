import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'node', 'promise', 'vue'],
  jsPlugins: [
    { name: '@stylistic', specifier: '@stylistic/eslint-plugin' },
  ],
  categories: {
    correctness: 'error',
    suspicious: 'error',
  },
  rules: {
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/no-floating-promises': 'off',
    '@stylistic/quotes': ['warn', 'single'],
    '@stylistic/indent': ['warn', 2],
    '@stylistic/semi': ['warn', 'always'],
    '@stylistic/no-trailing-spaces': 'warn',
    'vue/define-props-declaration': ['warn', 'type-based'],
  },
  settings: {},
  env: {
    builtin: true
  },
  globals: {},
  ignorePatterns: [],
  options: {},
});
