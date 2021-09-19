module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
  },
  overrides: [
    {
      files: ['**/**/pages/**'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};
