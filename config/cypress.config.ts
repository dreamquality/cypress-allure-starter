import { defineConfig } from 'cypress'
import { allureCypress } from "allure-cypress/reporter";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

export default defineConfig({
  
  video: process.env.ENABLE_VIDEO_RECORDING === 'true',
  defaultCommandTimeout: 5000,
  execTimeout: 5000,
  taskTimeout: 5000,
  pageLoadTimeout: 30000,
  requestTimeout: parseInt(process.env.API_TIMEOUT || '10000'),
  responseTimeout: 30000,
  screenshotsFolder: process.env.SCREENSHOTS_PATH || 'reports/screenshots',
  videosFolder: process.env.VIDEOS_PATH || 'reports/videos',
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    // API Configuration
    API_BASE_URL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '10000'),
    API_RETRY_ATTEMPTS: parseInt(process.env.API_RETRY_ATTEMPTS || '3'),
    
    // Authentication
    API_KEY: process.env.API_KEY || '',
    AUTH_TOKEN: process.env.AUTH_TOKEN || '',
    AUTH_USERNAME: process.env.AUTH_USERNAME || '',
    AUTH_PASSWORD: process.env.AUTH_PASSWORD || '',
    
    // Environment
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_ENV: process.env.TEST_ENV || 'dev',
    
    // UI Application
    UI_BASE_URL: process.env.UI_BASE_URL || 'https://sweetshop.netlify.app',
    
    // Test Data
    USE_FAKER: process.env.USE_FAKER === 'true',
    FAKER_SEED: parseInt(process.env.FAKER_SEED || '12345'),
    
    // Feature Flags
    ENABLE_MOCKING: process.env.ENABLE_MOCKING === 'true',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: process.env.ALLURE_RESULTS_PATH || "reports/allure-results",
      });
      return config;
    },
    baseUrl: process.env.UI_BASE_URL || 'https://sweetshop.netlify.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
})
