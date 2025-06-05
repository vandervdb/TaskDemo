module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'prettier',
  ],
  rules: {
    // 🧼 Formatage Prettier
    'prettier/prettier': 'warn',

    // 🧭 Tri automatique des imports
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    // 🔍 Qualité de code
    'no-unused-vars': 'off', // désactivé car on laisse @typescript-eslint gérer ça
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-duplicate-imports': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
