module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  transform: {

    '\\.[jt]sx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^root(.*)$': '<rootDir>/src$1',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(swiper|ssr-window|dom7)/)',
  ],
};
