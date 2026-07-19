import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/generated/**', // prisma generated client
      '**/*.js', // if you only lint .ts source, ignore compiled/generated JS everywhere
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      // --- Code quality ---
      'no-console': 'warn', // warn on console.log (allow console.error/warn if needed)
      'no-debugger': 'error',
      'no-unused-vars': 'off', // turn off base rule, use TS version instead
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'no-var': 'error', // disallow var, force let/const
      'prefer-const': 'warn', // prefer const when variable isn't reassigned
      eqeqeq: ['error', 'always'], // require === and !== instead of == and !=
      curly: 'error', // require curly braces for all control statements

      // --- TypeScript specific ---
      '@typescript-eslint/no-explicit-any': 'warn', // discourage 'any' type
      '@typescript-eslint/explicit-function-return-type': 'off', // don't force return types everywhere
      '@typescript-eslint/no-inferrable-types': 'warn', // avoid redundant type annotations
      '@typescript-eslint/no-non-null-assertion': 'warn', // discourage using '!'
      '@typescript-eslint/ban-ts-comment': 'warn', // warn on @ts-ignore usage

      // --- Style / consistency ---
      semi: ['error', 'always'], // require semicolons
      quotes: ['error', 'double', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],

      // --- Best practices ---
      'no-duplicate-imports': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-implicit-coercion': 'warn',
    },
  },
  prettier,
);
