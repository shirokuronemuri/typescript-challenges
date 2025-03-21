import antfu from '@antfu/eslint-config';

export default antfu(
  {
    markdown: false,
  },
  {
    rules: {
      'import/first': 'off',
      'no-alert': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'prefer-const': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/ban-types': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/no-namespace': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-unused-vars': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/no-unsafe-function-type': 'off',
      'ts/method-signature-style': 'off',
      'unused-imports/no-unused-vars': 'off',
      'style/semi': ['error', 'always'],
    },
  },
);
