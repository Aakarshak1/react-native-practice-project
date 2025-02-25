module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    '@react-native',
    'plugin:oxlint/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/function-component-definition': 0,
    'import/no-unresolved': [2, { ignore: ['^@react-native'] }],
    'import/extensions': [
      'error',
      'never',
      {
        ignorePackages: true,
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.ios.js',
          '.android.js',
          '.config.js',
        ],
      },
    },
  },
};
