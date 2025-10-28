import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended', 'prettier'],
    languageOptions: { globals: globals.node },
    ignores: [
      'dist/*',
      'node_modules',
      'deprecated',
      'coverage',
      '.husky',
      '.git',
    ],
  },
  tseslint.configs.recommended,
]);
