# API Testing & Network Mocking - Extended Features

This repository has been extended with comprehensive API testing capabilities and network mocking following Cypress and industry best practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Run all tests
npm run cy:run

# Run API tests only
npm run cy:api

# Run UI tests only
npm run cy:ui

# Open Cypress GUI
npm run cy:open
```

## 📁 Project Structure

```
cypress-allure-starter/
├── config/
│   ├── cypress.config.ts              # Main configuration with .env support
│   ├── cypress.dev.config.ts          # Development environment
│   ├── cypress.staging.config.ts      # Staging environment
│   └── cypress.prod.config.ts         # Production environment
├── cypress/
│   ├── e2e/
│   │   ├── api/                       # API Tests
│   │   │   ├── users.cy.ts           # User API tests (GET, POST, PUT, DELETE)
│   │   │   ├── posts.cy.ts           # Post API tests with filtering
│   │   │   └── todos.cy.ts           # Todo API tests
│   │   └── tests/                     # UI Tests
│   │       ├── addProductsAndCheckout.cy.ts
│   │       └── apiMocking.cy.ts      # UI tests with API mocking
│   ├── fixtures/
│   │   └── products.json
│   ├── mocks/                         # API Mock Definitions
│   │   ├── success/                   # Success scenarios
│   │   ├── error/                     # Error scenarios
│   │   └── empty/                     # Empty state scenarios
│   └── support/
│       ├── api/
│       │   ├── types.ts               # TypeScript interfaces
│       │   ├── baseApiClient.ts       # Base HTTP client
│       │   ├── apiClient.ts           # Domain-specific API client
│       │   └── mockManager.ts         # Mock management utilities
│       ├── builders/                  # Data Builder Pattern
│       │   ├── userBuilder.ts         # User data with Faker
│       │   ├── postBuilder.ts         # Post data with Faker
│       │   └── todoBuilder.ts         # Todo data with Faker
│       ├── schemas/                   # JSON Schema Validation
│       │   ├── userSchema.ts
│       │   ├── postSchema.ts
│       │   ├── todoSchema.ts
│       │   └── schemaValidator.ts     # AJV-based validation
│       ├── commands.ts
│       ├── e2e.ts
│       └── index.d.ts
├── docs/
│   ├── API_TESTING_GUIDE.md          # Comprehensive testing guide
│   └── ARCHITECTURE.md                # Architecture documentation
├── .github/
│   └── workflows/
│       └── cypress-tests.yml          # CI/CD with parallel execution
├── .env                               # Environment variables (not committed)
├── .env.example                       # Environment template
└── package.json
```

## 🎯 Key Features

### 1. API Client Pattern

Reusable API client with domain-specific methods:

```typescript
import { apiClient } from '../../support/api/apiClient';

// Get all users
apiClient.getUsers().then((response) => {
  expect(response.status).to.equal(200);
});

// Create a user
apiClient.createUser(userData).then((response) => {
  expect(response.status).to.equal(201);
});
```

### 2. Data Builder Pattern

Generate dynamic test data with Faker:

```typescript
import { UserBuilder } from '../../support/builders/userBuilder';

const user = UserBuilder.create()
  .withName('John Doe')
  .withEmail('john@example.com')
  .build();

const users = UserBuilder.createMany(5);
```

### 3. Schema Validation

Validate API responses with JSON schemas:

```typescript
import { assertSchema } from '../../support/schemas/schemaValidator';
import { userSchema } from '../../support/schemas/userSchema';

apiClient.getUser(1).then((response) => {
  assertSchema(response.body, userSchema);
});
```

### 4. Network Mocking

Mock API calls for UI tests:

```typescript
import { mockSuccess, mockError, mockEmpty } from '../../support/api/mockManager';

// Mock success
mockSuccess('GET', '**/api/users', mockData, 'getUsers');

// Mock error
mockError('GET', '**/api/users/999', 404, 'Not found');

// Mock empty state
mockEmpty('GET', '**/api/users', 'emptyUsers');
```

### 5. Environment Management

Secure environment variable handling:

```bash
# .env file
API_BASE_URL=https://jsonplaceholder.typicode.com
API_TIMEOUT=10000
AUTH_TOKEN=your-token-here
```

## 📝 Available Scripts

```bash
# Main scripts
npm run cy:run          # Run all tests with Allure
npm run cy:open         # Open Cypress GUI

# Test-specific scripts
npm run cy:ui           # Run UI tests only
npm run cy:api          # Run API tests only
npm run cy:all          # Run UI + API + generate report

# Environment-specific scripts
npm run cy:dev          # Run with dev config
npm run cy:staging      # Run with staging config
npm run cy:prod         # Run with prod config

# GUI with test type
npm run cy:ui:open      # Open GUI for UI tests
npm run cy:api:open     # Open GUI for API tests

# Reports
npm run report          # Generate and open Allure report
npm run report:api      # Generate API test report
npm run report:all      # Generate combined report
npm run clear           # Clear all reports
```

## 🧪 Test Examples

### API Test Example

```typescript
describe('User API Tests', () => {
  it('should create a user with Faker data', () => {
    const newUser = UserBuilder.create().build();

    apiClient.createUser(newUser).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      assertSchema(response.body, userSchema);
    });
  });

  it('should handle errors gracefully', () => {
    apiClient.getUser(99999)
      .then(() => {
        throw new Error('Should have failed');
      })
      .catch((error) => {
        expect(error.status).to.equal(404);
      });
  });
});
```

### UI Test with Mocking

```typescript
describe('UI with API Mocking', () => {
  it('should display mocked user data', () => {
    cy.fixture('mocks/success/users').then((mockUsers) => {
      mockSuccess('GET', '**/api/users', mockUsers, 'getUsers');
      cy.visit('/users');
      cy.wait('@getUsers');
      // Assertions on UI
    });
  });

  it('should handle API errors', () => {
    mockError('GET', '**/api/users', 500, 'Server error');
    cy.visit('/users');
    cy.contains('An error occurred').should('be.visible');
  });
});
```

## 🏗️ Architecture Patterns

### API Client Pattern
- Centralized request handling
- Type-safe with TypeScript
- Authentication support
- Consistent error handling

### Builder Pattern
- Fluent API for test data
- Integration with Faker
- Reusable across tests
- Optional parameters

### Fixture Pattern
- Version-controlled mocks
- Organized by scenario
- Easy to maintain
- Shareable data

### Mock Manager
- Centralized mock registration
- Multiple mock strategies
- Easy to apply and manage

## 🔒 Security Best Practices

1. **Never commit secrets**: Use `.env` for local, CI secrets for pipeline
2. **Use environment variables**: All sensitive data in `.env`
3. **Rotate credentials**: Regular token rotation
4. **Sanitize test data**: Don't use production data

## 📊 CI/CD Integration

### GitHub Actions

The project includes a complete GitHub Actions workflow with:

- Parallel test execution
- API and UI tests separation
- Allure report generation
- Screenshot/video capture on failure
- Slack notifications

```yaml
# Run tests in CI
- name: Run API Tests
  run: npm run cy:api

- name: Run UI Tests
  run: npm run cy:ui
```

### Parallel Execution

```bash
# Run tests in parallel containers
cypress run --parallel --record --key <key>
```

## 📚 Documentation

- [API Testing Guide](docs/API_TESTING_GUIDE.md) - Comprehensive testing guide
- [Architecture](docs/ARCHITECTURE.md) - Architecture and design patterns
- [Original README](README.md) - Original project README

## 🎓 Best Practices

### When to Mock vs Real API

**Use Mocks:**
- Testing UI behavior
- Error scenarios
- Edge cases
- CI/CD for speed
- API under development

**Use Real API:**
- Integration testing
- E2E testing
- Performance testing
- Contract validation
- Staging/Production tests

### Test Organization

```typescript
describe('Feature', () => {
  describe('GET operations', () => {
    // GET tests
  });

  describe('POST operations', () => {
    // POST tests
  });

  describe('Error Handling', () => {
    // Error scenarios
  });
});
```

### Schema Validation

Always validate API responses:

```typescript
it('should validate response schema', () => {
  apiClient.getUser(1).then((response) => {
    assertSchema(response.body, userSchema);
  });
});
```

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
API_BASE_URL=https://api.example.com
API_TIMEOUT=10000
API_RETRY_ATTEMPTS=3

# Authentication
AUTH_TOKEN=your-token
API_KEY=your-key

# Environment
TEST_ENV=dev
NODE_ENV=development

# Feature Flags
ENABLE_MOCKING=true
ENABLE_VIDEO_RECORDING=true
```

### Multiple Environments

```bash
# Development
npm run cy:dev

# Staging
npm run cy:staging

# Production
npm run cy:prod
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests: `npm run cy:all`
4. Create pull request

## 📖 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [AJV Schema Validation](https://ajv.js.org/)
- [Faker.js](https://fakerjs.dev/)
- [Allure Reports](https://docs.qameta.io/allure/)

## 💡 Tips

1. Use schema validation for all API tests
2. Generate dynamic data with builders
3. Organize mocks by scenario
4. Use environment-specific configs
5. Monitor test execution times
6. Keep documentation updated

## 📄 License

ISC

## 👤 Author

[dreamquality](https://github.com/dreamquality)

---

For detailed information, see the [API Testing Guide](docs/API_TESTING_GUIDE.md).
