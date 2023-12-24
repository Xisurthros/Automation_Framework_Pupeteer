module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  testTimeout: 15000,
  globalSetup: './setup/globalSetup.js',
  globalTeardown: './setup/globalTeardown.js',
};