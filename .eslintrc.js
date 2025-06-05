module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  plugins: [
    'react',
    'react-native',
    'prettier',
    '@typescript-eslint',
    'simple-import-sort',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 💅 Active le formatage Prettier
    'prettier/prettier': 'warn',

    // 🚀 Tri des imports
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    // 🔧 Autres règles utiles
    'no-duplicate-imports': 'warn',
    'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'react/react-in-jsx-scope': 'off', // inutile avec React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
