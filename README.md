
# Cypress E2E TypeScript

> Automation Testing Framework using **Cypress**, **TypeScript**, and **Allure Reporter**.

![Cypress](https://img.shields.io/badge/tested_with-cypress-04C38E.svg)
![TypeScript](https://img.shields.io/badge/language-Typescript-blue.svg)
![Allure](https://img.shields.io/badge/report-Allure-orange.svg)
![API Testing](https://img.shields.io/badge/API-Testing-blue.svg)
![Faker](https://img.shields.io/badge/faker.js-dynamic_data-green.svg)

## Description

This project provides a comprehensive template for writing **E2E** and **API tests** with **Cypress**, using **TypeScript**, and generating automated **Allure Reports**.  

### ✨ Key Features

- 🎯 **UI Testing**: Complete E2E testing capabilities
- 🔌 **API Testing**: Comprehensive API testing with dedicated client
- 🎭 **Network Mocking**: Advanced mocking with cy.intercept()
- 🏗️ **Builder Pattern**: Dynamic test data with Faker.js
- ✅ **Schema Validation**: JSON schema validation with AJV
- 🔒 **Environment Management**: Secure configuration with dotenv
- 📊 **Allure Reports**: Beautiful test reporting
- 🚀 **CI/CD Ready**: GitHub Actions workflow included
- 📝 **TypeScript**: Full type safety

It can be used as a starting point for building and running automation tests on various projects.


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dreamquality/cypress-allure-starter.git
   ```
   *(Replace the URL if your repository differs.)*

2. **Navigate to the project directory**:
   ```bash
   cd cypress-allure-starter
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
   (depending on your package manager)


## NPM Scripts

### Main Scripts
- **`cy:open`** — Opens the Cypress GUI for interactive test execution.  
- **`cy:run`** — Runs tests via CLI using `config/cypress.config.ts` with Allure enabled.

### Test-Specific Scripts
- **`cy:ui`** — Runs UI tests only from `cypress/e2e/tests/`.
- **`cy:api`** — Runs API tests only from `cypress/e2e/api/`.
- **`cy:all`** — Runs all tests (UI + API) and generates a combined report.

### Environment-Specific Scripts
- **`cy:dev`** — Runs tests with development configuration.
- **`cy:staging`** — Runs tests with staging configuration.
- **`cy:prod`** — Runs tests with production configuration.

### GUI Scripts
- **`cy:ui:open`** — Opens Cypress GUI for UI tests.
- **`cy:api:open`** — Opens Cypress GUI for API tests.

### Reporting Scripts
- **`report`** — Generates and opens an Allure report from the results in `reports/ui/allure-results`.  
- **`report:all`** — Generates combined report from all test results.
- **`report:api`** — Generates report from API test results.
- **`allure:generate`** — Generates an Allure report from the default `allure-results` folder.  
- **`clear`** — Deletes the `reports/**` directory to clean up old results.

## 📖 Extended Documentation

For comprehensive API testing documentation, see:

- **[API Testing Guide](docs/API_TESTING_GUIDE.md)** - Complete guide for API testing
- **[Architecture Documentation](docs/ARCHITECTURE.md)** - Design patterns and architecture
- **[API Testing README](API_TESTING_README.md)** - Quick reference for API testing features

## 🚀 Quick Start with API Testing

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Run API tests
npm run cy:api

# Run UI tests
npm run cy:ui

# Run all tests
npm run cy:all
```

## 🏗️ Project Structure

```
cypress-allure-starter/
├── config/                    # Configuration files
│   ├── cypress.config.ts      # Main config with .env support
│   ├── cypress.dev.config.ts  # Development config
│   ├── cypress.staging.config.ts
│   └── cypress.prod.config.ts
├── cypress/
│   ├── e2e/
│   │   ├── api/              # API tests
│   │   │   ├── users.cy.ts
│   │   │   ├── posts.cy.ts
│   │   │   └── todos.cy.ts
│   │   └── tests/            # UI tests
│   │       └── addProductsAndCheckout.cy.ts
│   ├── fixtures/             # Test data
│   ├── mocks/                # API mocks
│   │   ├── success/
│   │   ├── error/
│   │   └── empty/
│   └── support/
│       ├── api/              # API client & utilities
│       ├── builders/         # Data builders with Faker
│       └── schemas/          # JSON schemas for validation
├── docs/                     # Documentation
└── .env.example              # Environment template
```


## License
This project is licensed under the [ISC](LICENSE) license (or any other license defined in your repository).

---

> **Author**: [dreamquality](https://github.com/dreamquality)  
