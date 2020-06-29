module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'plugin:import/recommended'],
  plugins: ['@typescript-eslint', 'prettier', 'jest', 'import'],
  rules: {
    'prettier/prettier': 'error',
    curly: ['error', 'multi-line'],
  },

  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // could impact performance
        'prettier/@typescript-eslint',
      ],
    },
    {
      files: ['tests/**/*.ts'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: { 'jest/consistent-test-it': 'error' },
    },
  ],
}
