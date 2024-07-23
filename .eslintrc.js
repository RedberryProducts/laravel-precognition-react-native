module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react-hooks/recommended'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 0,
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
    'react/jsx-no-duplicate-props': 'off',
    // 'react/hook-use-state': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'dot-notation': 'off',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: false,
        variableDeclaration: false,
      },
    ],
    'no-console': 'warn',
  },
  plugins: ['react', '@react-native', 'react-hooks'],
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
};
