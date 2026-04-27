import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './mytest',

  // Modern defaults - most teams use these
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,      // or unlimited = '100%'

  reporter: [
    ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
    ['list'],   // ← important for CI logs
  ],

  use: {
   // trace: 'on-first-retry',           // cheaper than retain-on-failure
    screenshot: 'only-on-failure',
   // video: 'retain-on-failure',
    ignoreHTTPSErrors: false,          // ← safer default
    //storageState:"testdata/authentication.json",
    // If you really want maximized window (local dev only)
    // viewport: null,
    // launchOptions: {
    //   args: ['--start-maximized'],
    // },

    // More predictable & works better on cloud
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment when needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // If you later need env-specific config
  // globalSetup: async () => {
  //   // load dotenv here if needed
  // },
});