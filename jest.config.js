module.exports = {
  preset: 'jest-puppeteer',
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
      launchOptions: {
        headless: true
      }
    }
  },
  testMatch: ['**/tests/**/*.js']
};
