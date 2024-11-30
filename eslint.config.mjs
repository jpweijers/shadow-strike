// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'eqeqeq': ['error', 'always'],
      'no-console': ['error', { 'allow': ['warn', 'error'] }],
      'no-fallthrough': 'error',
      'curly': ['error', 'all'],
    }
  }
);
