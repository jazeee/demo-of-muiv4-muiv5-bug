module.exports = {
  root: true,
  extends: ['react-app'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'linebreak-style': ['error', 'unix'],
    // Console output is generally not a good coding practice, in production.
    // Use a logger instead.
    'no-console': 'error',
    // i++, --i, often introduces confusion in code. AirBNB defaults to never allow this.
    // no-plusplus with allowForLoopAfterthoughts allows for usage in a for loop only.
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/extensions': [
      'error',
      {
        json: 'always',
        tsx: 'never',
        ts: 'never',
      },
    ],
    'import/no-default-export': ['error'],
    // MaterialUI has lower and upper case props
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
  },
  overrides: [
    {
      files: ['**/*.stories.ts*', '**/index.ts*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
