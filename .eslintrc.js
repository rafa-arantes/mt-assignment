module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['assets', './src/assets'],
          ['components', './src/components'],
          ['hooks', './src/hooks'],
          ['pages', './src/pages'],
          ['root', './src'],
        ],
      },
    },
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/require-default-props': 0,
    'no-restricted-exports': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
  },
};
