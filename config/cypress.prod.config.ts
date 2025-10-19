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
  requestTimeout: 15000,
  responseTimeout: 30000,
  screenshotsFolder: 'reports/prod/screenshots',
  videosFolder: 'reports/prod/videos',
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    API_BASE_URL: process.env.PROD_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    API_TIMEOUT: 15000,
    UI_BASE_URL: process.env.PROD_UI_BASE_URL || 'https://sweetshop.netlify.app',
    TEST_ENV: 'prod',
    ENABLE_MOCKING: false, // Never use mocks in production
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "reports/prod/allure-results",
      });
      return config;
    },
    baseUrl: process.env.PROD_UI_BASE_URL || 'https://sweetshop.netlify.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
})
