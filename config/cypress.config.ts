import { defineConfig } from 'cypress'
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  
  video: true,
  defaultCommandTimeout: 5000,
  execTimeout: 5000,
  taskTimeout: 5000,
  pageLoadTimeout: 60000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  screenshotsFolder: 'reports/screenshots',
  videosFolder: 'reports/videos',
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "../allure-results",
      });
      return config;
    },
    baseUrl: 'https://sweetshop.netlify.app',
    specPattern: 'cypress/e2e/tests/**/*.cy.ts',
  },
})
