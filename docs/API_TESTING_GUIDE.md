# API Testing Guide

This guide provides comprehensive documentation for API testing capabilities in this Cypress project.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [API Client Usage](#api-client-usage)
5. [Data Builders](#data-builders)
6. [Schema Validation](#schema-validation)
7. [Mocking Strategies](#mocking-strategies)
8. [Best Practices](#best-practices)
9. [CI/CD Integration](#cicd-integration)

## Architecture Overview

The project follows clean architecture principles with clear separation of concerns:

- **API Client Pattern**: Centralized API request handling
- **Builder Pattern**: Dynamic test data generation with Faker
- **Fixture Pattern**: Reusable mock data
- **Schema Validation**: Contract testing with AJV

### Key Components

```
cypress/
├── e2e/
│   ├── api/           # API tests
│   └── tests/         # UI tests (with mocking)
├── support/
│   ├── api/           # API clients and utilities
│   ├── builders/      # Data builders
│   └── schemas/       # JSON schemas
├── fixtures/          # Test data
└── mocks/             # API mock definitions
```

## Project Structure

### Recommended Folder Organization

```
cypress-allure-starter/
├── config/
│   ├── cypress.config.ts         # Main configuration
│   ├── cypress.dev.config.ts     # Development environment
│   ├── cypress.staging.config.ts # Staging environment
│   └── cypress.prod.config.ts    # Production environment
├── cypress/
│   ├── e2e/
│   │   ├── api/                  # API Tests
│   │   │   ├── users.cy.ts
│   │   │   ├── posts.cy.ts
│   │   │   └── todos.cy.ts
│   │   └── tests/                # UI Tests
│   │       ├── addProductsAndCheckout.cy.ts
│   │       └── apiMocking.cy.ts
│   ├── fixtures/
│   │   └── products.json
│   ├── mocks/
│   │   ├── success/              # Success scenarios
│   │   │   ├── users.json
│   │   │   └── posts.json
│   │   ├── error/                # Error scenarios
│   │   │   ├── notFound.json
│   │   │   └── serverError.json
│   │   └── empty/                # Empty state scenarios
│   │       └── emptyArray.json
│   └── support/
│       ├── api/
│       │   ├── types.ts          # TypeScript interfaces
│       │   ├── baseApiClient.ts  # Base HTTP client
│       │   ├── apiClient.ts      # Domain-specific client
│       │   └── mockManager.ts    # Mock utilities
│       ├── builders/
│       │   ├── userBuilder.ts    # User data builder
│       │   ├── postBuilder.ts    # Post data builder
│       │   └── todoBuilder.ts    # Todo data builder
│       ├── schemas/
│       │   ├── userSchema.ts
│       │   ├── postSchema.ts
│       │   ├── todoSchema.ts
│       │   └── schemaValidator.ts
│       ├── commands.ts
│       ├── e2e.ts
│       └── index.d.ts
├── .env                          # Environment variables
├── .env.example                  # Environment template
└── package.json
```

### Naming Conventions

- **API Tests**: `cypress/e2e/api/*.cy.ts`
- **UI Tests**: `cypress/e2e/tests/*.cy.ts`
- **Builders**: `*Builder.ts` (e.g., `userBuilder.ts`)
- **Schemas**: `*Schema.ts` (e.g., `userSchema.ts`)
- **Mocks**: Organized by type (success, error, empty)

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### Running Tests

```bash
# Run all tests
npm run cy:run

# Run UI tests only
npm run cy:ui

# Run API tests only
npm run cy:api

# Run all tests (UI + API)
npm run cy:all

# Open Cypress GUI
npm run cy:open

# Environment-specific runs
npm run cy:dev
npm run cy:staging
npm run cy:prod
```

## API Client Usage

### Basic Usage

```typescript
import { apiClient } from '../../support/api/apiClient';

describe('API Tests', () => {
  it('should get all users', () => {
    apiClient.getUsers().then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should get a specific user', () => {
    apiClient.getUser(1).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(1);
    });
  });

  it('should create a user', () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe'
    };

    apiClient.createUser(newUser).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
    });
  });
});
```

### Custom API Client

Extend the `BaseApiClient` for your own APIs:

```typescript
import { BaseApiClient } from './baseApiClient';

export class MyApiClient extends BaseApiClient {
  constructor() {
    super('https://my-api.com');
  }

  public getProducts(): Cypress.Chainable<ApiResponse<Product[]>> {
    return this.get<Product[]>('/products');
  }

  public createOrder(orderData: Order): Cypress.Chainable<ApiResponse<Order>> {
    return this.post<Order>('/orders', orderData);
  }
}
```

## Data Builders

### Using Builders

```typescript
import { UserBuilder } from '../../support/builders/userBuilder';

// Simple builder usage
const user = UserBuilder.create()
  .withName('John Doe')
  .withEmail('john@example.com')
  .build();

// Minimal user
const minimalUser = UserBuilder.createMinimal();

// Multiple users
const users = UserBuilder.createMany(5);

// Chaining
const admin = UserBuilder.create()
  .withName('Admin User')
  .withEmail('admin@example.com')
  .withCompany('ACME Corp', 'Leading Solutions', 'innovative')
  .build();
```

### Creating Custom Builders

```typescript
import { faker } from '@faker-js/faker';

export class ProductBuilder {
  private product: Partial<Product>;

  constructor() {
    this.product = {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
    };
  }

  public withName(name: string): this {
    this.product.name = name;
    return this;
  }

  public withPrice(price: number): this {
    this.product.price = price;
    return this;
  }

  public build(): Partial<Product> {
    return { ...this.product };
  }

  public static create(): ProductBuilder {
    return new ProductBuilder();
  }
}
```

## Schema Validation

### Using Schema Validation

```typescript
import { assertSchema } from '../../support/schemas/schemaValidator';
import { userSchema } from '../../support/schemas/userSchema';

it('should validate user schema', () => {
  apiClient.getUser(1).then((response) => {
    assertSchema(response.body, userSchema);
  });
});

// Using Cypress command
it('should validate with custom command', () => {
  apiClient.getUsers().then((response) => {
    cy.validateSchema(response.body, usersArraySchema);
  });
});

// Using Chai assertion
it('should use chai assertion', () => {
  apiClient.getUser(1).then((response) => {
    expect(response.body).to.matchSchema(userSchema);
  });
});
```

### Creating Custom Schemas

```typescript
export const productSchema = {
  type: 'object',
  required: ['id', 'name', 'price'],
  properties: {
    id: { type: 'number', minimum: 1 },
    name: { type: 'string', minLength: 1 },
    price: { type: 'number', minimum: 0 },
    description: { type: 'string' },
    inStock: { type: 'boolean' },
  },
};
```

## Mocking Strategies

### When to Mock vs Real API

**Use Mocks When:**
- Testing UI behavior independent of API
- Testing error scenarios
- Testing edge cases
- Running tests in CI/CD (for speed)
- API is under development

**Use Real API When:**
- Integration testing
- End-to-end testing
- Performance testing
- Validating actual API contracts
- Staging/Production smoke tests

### Basic Mocking

```typescript
import { mockSuccess, mockError, mockEmpty } from '../../support/api/mockManager';

// Mock success response
mockSuccess('GET', '**/api/users', mockData, 'getUsers');
cy.wait('@getUsers');

// Mock error response
mockError('GET', '**/api/users/999', 404, 'Not found', 'notFound');
cy.wait('@notFound');

// Mock empty response
mockEmpty('GET', '**/api/users', 'emptyUsers');
cy.wait('@emptyUsers');
```

### Advanced Mocking

```typescript
// Mock with delay
cy.intercept('GET', '**/api/users', {
  statusCode: 200,
  body: mockData,
  delay: 2000, // 2 seconds
}).as('delayedResponse');

// Dynamic responses
cy.intercept('GET', '**/api/users/**', (req) => {
  const userId = req.url.split('/').pop();
  req.reply({
    statusCode: 200,
    body: { id: userId, name: `User ${userId}` },
  });
});

// Conditional mocking
cy.intercept('GET', '**/api/users', (req) => {
  if (req.headers['authorization']) {
    req.reply({ statusCode: 200, body: authorizedData });
  } else {
    req.reply({ statusCode: 401, body: { error: 'Unauthorized' } });
  }
});
```

## Best Practices

### API Testing Best Practices

1. **Use Schema Validation**: Always validate API responses
2. **Test Error Scenarios**: Don't just test happy paths
3. **Use Data Builders**: Keep tests maintainable
4. **Avoid Hard-coded Data**: Use Faker for dynamic data
5. **Test Performance**: Monitor response times
6. **Use Proper Assertions**: Be specific in expectations
7. **Clean Up Test Data**: Remove created resources

### Code Organization

```typescript
describe('Resource Management', () => {
  describe('GET operations', () => {
    // All GET tests
  });

  describe('POST operations', () => {
    // All POST tests
  });

  describe('Error Handling', () => {
    // Error scenarios
  });

  describe('Performance', () => {
    // Performance tests
  });
});
```

### Environment Management

```typescript
// Use environment variables
const apiUrl = Cypress.env('API_BASE_URL');
const timeout = Cypress.env('API_TIMEOUT');

// Use different configs per environment
// npm run cy:dev
// npm run cy:staging
// npm run cy:prod
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        containers: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run API Tests
        run: npm run cy:api
      
      - name: Run UI Tests
        run: npm run cy:ui
      
      - name: Generate Allure Report
        if: always()
        run: npm run allure:generate
      
      - name: Upload Allure Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: allure-results
          path: reports/allure-results
```

### Parallel Execution

```bash
# Run tests in parallel
cypress run --parallel --record --key <record-key>

# Split by spec files
cypress run --spec "cypress/e2e/api/**/*.cy.ts"
cypress run --spec "cypress/e2e/tests/**/*.cy.ts"
```

### Retries Configuration

```typescript
// In cypress config
retries: {
  runMode: 2,    // Retry failed tests 2 times in CI
  openMode: 0,   // Don't retry in GUI
}
```

## Troubleshooting

### Common Issues

**Issue**: Schema validation fails
**Solution**: Check your schema definition matches the actual response structure

**Issue**: Mocks not intercepting requests
**Solution**: Ensure intercept is called before the request, use wildcards in URL patterns

**Issue**: Tests fail in CI but pass locally
**Solution**: Check environment variables, network conditions, and timing issues

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [AJV Schema Validation](https://ajv.js.org/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [Allure Reports](https://docs.qameta.io/allure/)

## Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/dreamquality/cypress-allure-starter).
