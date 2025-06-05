export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      // Possible Errors
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-unreachable': 'error',
      'valid-typeof': 'error',

      // Best Practices
      'consistent-return': 'error',
      curly: 'error',
      'default-case': 'error',
      eqeqeq: ['error', 'always'],
      'no-alert': 'error',
      'no-caller': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new': 'error',
      'no-return-assign': 'error',
      'no-unused-expressions': 'error',
      'no-with': 'error',
      radix: 'error',

      // Variables
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-shadow': 'error',
      'no-undef': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Stylistic Issues
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      indent: ['error', 2],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',

      // ES6
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error'
    }
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
];
