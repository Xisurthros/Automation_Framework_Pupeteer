module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  testTimeout: 15000,
  globalSetup: '<rootDir>/setup/globalSetup.js',
  globalTeardown: '<rootDir>/setup/globalTeardown.js',
};
