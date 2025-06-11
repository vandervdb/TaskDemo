import reactNative from '@react-native/eslint-config';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  reactNative.flat, // <- ajouter ici
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        __DEV__: true,
        require: 'readonly',
        module: 'readonly',
        console: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'no-duplicate-imports': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
