import { defineConfig } from 'cypress'
import { allureCypress } from "allure-cypress/reporter";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

export default defineConfig({
  video: true,
  defaultCommandTimeout: 5000,
  execTimeout: 5000,
  taskTimeout: 5000,
  pageLoadTimeout: 30000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  screenshotsFolder: 'reports/staging/screenshots',
  videosFolder: 'reports/staging/videos',
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    API_BASE_URL: process.env.STAGING_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    API_TIMEOUT: 10000,
    UI_BASE_URL: process.env.STAGING_UI_BASE_URL || 'https://sweetshop.netlify.app',
    TEST_ENV: 'staging',
    ENABLE_MOCKING: false, // Use real APIs in staging
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "reports/staging/allure-results",
      });
      return config;
    },
    baseUrl: process.env.STAGING_UI_BASE_URL || 'https://sweetshop.netlify.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
})
