// eslint.cjs
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off', // pour ton test
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    'react-native/no-inline-styles': 'warn',
    "@typescript-eslint/semi": ["error", "always"],
  },
  reportUnusedDisableDirectives: false, // ✅ Clé pour empêcher ESLint de supprimer les disables inutiles
};
