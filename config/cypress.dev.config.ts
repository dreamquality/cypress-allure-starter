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
  screenshotsFolder: 'reports/dev/screenshots',
  videosFolder: 'reports/dev/videos',
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    API_TIMEOUT: 10000,
    UI_BASE_URL: 'https://sweetshop.netlify.app',
    TEST_ENV: 'dev',
    ENABLE_MOCKING: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "reports/dev/allure-results",
      });
      return config;
    },
    baseUrl: 'https://sweetshop.netlify.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
})
