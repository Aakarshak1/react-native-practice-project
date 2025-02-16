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
    'import/extensions': [
      'error',
      'never',
      {
        ignorePackages: true,
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/un-resolved': false,
  },
};
