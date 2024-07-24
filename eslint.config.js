import js from '@eslint/js';

export default [
  js.configs.recommended,
  js.configs.all,
  {
    rules: {
      module: 'off',
      'no-undef': 'off',
      semi: ['warn', 'always'],
      'sort-imports': 'off',
      'one-var': 'off',
      'sort-keys': 'off',
    },
  },
  {
    ignores: ['./dist/*'],
  },
];
