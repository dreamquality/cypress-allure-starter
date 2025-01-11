
# Cypress E2E TypeScript

> Automation Testing Framework using **Cypress**, **TypeScript**, and **Allure Reporter**.

![Cypress](https://img.shields.io/badge/tested_with-cypress-04C38E.svg)
![TypeScript](https://img.shields.io/badge/language-Typescript-blue.svg)
![Allure](https://img.shields.io/badge/report-Allure-orange.svg)

## Description

This project provides a template for writing E2E tests with **Cypress**, using **TypeScript**, and generating automated **Allure Reports**.  
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

- **`cy:open`** — Opens the Cypress GUI for interactive test execution.  
- **`cy:run`** — Runs tests via CLI using `config/cypress.config.ts` with Allure enabled.  
- **`report`** — Generates and opens an Allure report from the results in `reports/ui/allure-results`.  
- **`allure:generate`** — Generates an Allure report from the default `allure-results` folder.  
- **`clear`** — Deletes the `reports/**` directory to clean up old results.


## License
This project is licensed under the [ISC](LICENSE) license (or any other license defined in your repository).

---

> **Author**: [dreamquality](https://github.com/dreamquality)  
