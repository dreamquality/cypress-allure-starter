# Complete Folder Structure

## Overview

This document provides a complete view of the project structure with descriptions of each component.

## 📁 Project Root

```
cypress-allure-starter/
├── .github/                      # GitHub-specific files
├── config/                       # Cypress configurations
├── cypress/                      # Cypress test files
├── docs/                         # Documentation
├── node_modules/                 # Dependencies (not committed)
├── reports/                      # Test reports (not committed)
├── .env                          # Environment variables (not committed)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── API_TESTING_README.md         # API testing quick reference
├── package.json                  # Project dependencies
├── package-lock.json             # Dependency lock file
├── QUICK_START.md                # Quick start guide
├── README.md                     # Main documentation
└── tsconfig.json                 # TypeScript configuration
```

## 🔧 Configuration Directory

```
config/
├── cypress.config.ts             # Main Cypress configuration
│                                 # - Includes dotenv support
│                                 # - Environment variables
│                                 # - Allure integration
│
├── cypress.dev.config.ts         # Development environment config
│                                 # - Dev API endpoints
│                                 # - Development settings
│
├── cypress.staging.config.ts     # Staging environment config
│                                 # - Staging API endpoints
│                                 # - Pre-production settings
│
└── cypress.prod.config.ts        # Production environment config
                                  # - Production API endpoints
                                  # - Retry strategies
```

## 🧪 Cypress Directory

```
cypress/
├── e2e/                          # End-to-end tests
│   ├── 1-getting-started/        # Example tests (original)
│   ├── 2-advanced-examples/      # Advanced examples (original)
│   │
│   ├── api/                      # 🆕 API Tests
│   │   ├── users.cy.ts          # User CRUD operations
│   │   │                        # - GET, POST, PUT, PATCH, DELETE
│   │   │                        # - Schema validation
│   │   │                        # - Error handling
│   │   │
│   │   ├── posts.cy.ts          # Post operations
│   │   │                        # - Filtering by user
│   │   │                        # - Comments testing
│   │   │                        # - Performance tests
│   │   │
│   │   └── todos.cy.ts          # Todo operations
│   │                            # - Status filtering
│   │                            # - Business logic tests
│   │
│   ├── pages/                    # Page Objects (original)
│   │   ├── checkoutPage.ts
│   │   └── sweetshopPage.ts
│   │
│   └── tests/                    # 🆕 UI Tests
│       ├── addProductsAndCheckout.cy.ts  # Original UI test
│       └── apiMocking.cy.ts              # 🆕 UI test with mocking
│                                         # - Success scenarios
│                                         # - Error scenarios
│                                         # - Empty states
│                                         # - Loading states
│
├── fixtures/                     # Test data files
│   └── products.json            # Product fixture (original)
│
├── mocks/                        # 🆕 API Mock Definitions
│   ├── success/                 # Success scenario mocks
│   │   ├── users.json          # Mock user data
│   │   └── posts.json          # Mock post data
│   │
│   ├── error/                   # Error scenario mocks
│   │   ├── notFound.json       # 404 error response
│   │   └── serverError.json    # 500 error response
│   │
│   └── empty/                   # Empty state mocks
│       └── emptyArray.json     # Empty array response
│
└── support/                      # Support files and utilities
    ├── api/                      # 🆕 API Infrastructure
    │   ├── types.ts             # TypeScript interfaces
    │   │                        # - Request/Response types
    │   │                        # - Domain models (User, Post, etc.)
    │   │                        # - Error types
    │   │
    │   ├── baseApiClient.ts     # Base HTTP client
    │   │                        # - Generic request methods
    │   │                        # - Authentication handling
    │   │                        # - Header management
    │   │
    │   ├── apiClient.ts         # Domain-specific API client
    │   │                        # - User endpoints
    │   │                        # - Post endpoints
    │   │                        # - Todo endpoints
    │   │                        # - Album/Photo endpoints
    │   │
    │   └── mockManager.ts       # Mock management utilities
    │                            # - Mock registration
    │                            # - Helper functions
    │                            # - Mock strategies
    │
    ├── builders/                 # 🆕 Data Builders (Faker)
    │   ├── userBuilder.ts       # User data builder
    │   │                        # - Fluent API
    │   │                        # - Faker integration
    │   │                        # - Bulk generation
    │   │
    │   ├── postBuilder.ts       # Post data builder
    │   │                        # - Dynamic content
    │   │                        # - User association
    │   │
    │   └── todoBuilder.ts       # Todo data builder
    │                            # - Status handling
    │                            # - User association
    │
    ├── schemas/                  # 🆕 JSON Schema Validation
    │   ├── schemaValidator.ts   # Validation utilities
    │   │                        # - AJV integration
    │   │                        # - Custom commands
    │   │                        # - Chai assertions
    │   │
    │   ├── userSchema.ts        # User JSON schema
    │   ├── postSchema.ts        # Post JSON schema
    │   └── todoSchema.ts        # Todo JSON schema
    │
    ├── commands.ts               # Custom Cypress commands
    │                            # - softAssert (original)
    │                            # - assertAll (original)
    │                            # - fillCheckoutForm (original)
    │
    ├── e2e.ts                    # Global test setup
    │                            # - Import commands
    │                            # - Import Allure
    │                            # - 🆕 Schema validation setup
    │
    └── index.d.ts                # TypeScript declarations
                                  # - Custom command types
                                  # - 🆕 Schema validation types
```

## 📚 Documentation Directory

```
docs/
├── API_TESTING_GUIDE.md          # Comprehensive API testing guide
│                                 # - Architecture overview
│                                 # - Usage examples
│                                 # - Best practices
│                                 # - CI/CD integration
│
├── ARCHITECTURE.md               # Architecture documentation
│                                 # - Design patterns
│                                 # - Component architecture
│                                 # - Data flow
│                                 # - Testing strategy
│
├── FOLDER_STRUCTURE.md           # This document
│                                 # - Complete structure
│                                 # - Component descriptions
│
└── IMPLEMENTATION_SUMMARY.md     # Implementation summary
                                  # - Statistics
                                  # - Features implemented
                                  # - Deliverables completed
```

## 🔄 CI/CD Directory

```
.github/
└── workflows/
    └── cypress-tests.yml         # GitHub Actions workflow
                                  # - API test job
                                  # - UI test job
                                  # - Report generation
                                  # - Parallel execution
                                  # - Artifact management
```

## 📊 Reports Directory (Not Committed)

```
reports/
├── screenshots/                  # Test failure screenshots
├── videos/                       # Test execution videos
├── allure-results/              # Allure raw results
└── allure-report/               # Generated Allure report
```

## 🗂️ File Type Legend

- 📄 `.ts` - TypeScript files
- 📄 `.js` - JavaScript files
- 📄 `.json` - JSON data files
- 📄 `.md` - Markdown documentation
- 📄 `.yml` - YAML configuration
- 📁 `/` - Directory

## 🎯 Key Directories by Purpose

### Testing
- `cypress/e2e/api/` - API tests
- `cypress/e2e/tests/` - UI tests
- `cypress/e2e/pages/` - Page objects

### Infrastructure
- `cypress/support/api/` - API utilities
- `cypress/support/builders/` - Data builders
- `cypress/support/schemas/` - Schema validation

### Test Data
- `cypress/fixtures/` - Static test data
- `cypress/mocks/` - API mocks

### Configuration
- `config/` - Environment configs
- `.env` - Environment variables

### Documentation
- `docs/` - Technical documentation
- Root `*.md` files - Quick references

## 🆕 New Files vs Original

### Original Files (Preserved)
- All files in `cypress/e2e/1-getting-started/`
- All files in `cypress/e2e/2-advanced-examples/`
- All files in `cypress/e2e/pages/`
- `cypress/e2e/tests/addProductsAndCheckout.cy.ts`
- `cypress/fixtures/products.json`
- Core support files (commands.ts, e2e.ts)

### New Files Added (34)
- 🆕 API test infrastructure (8 files)
- 🆕 Data builders (3 files)
- 🆕 Schema validation (4 files)
- 🆕 API tests (3 files)
- 🆕 Mock definitions (5 files)
- 🆕 Documentation (4 files)
- 🆕 Configuration (5 files)
- 🆕 CI/CD (1 file)
- 🆕 Root documentation (2 files)

### Updated Files (6)
- ✏️ `package.json` - Dependencies and scripts
- ✏️ `config/cypress.config.ts` - Environment support
- ✏️ `cypress/support/e2e.ts` - Schema validation
- ✏️ `cypress/support/index.d.ts` - Type declarations
- ✏️ `.gitignore` - New ignore patterns
- ✏️ `README.md` - Feature documentation

## 📏 Size Statistics

### Lines of Code (Approximate)
- API Infrastructure: ~600 lines
- Data Builders: ~400 lines
- Schema Validation: ~300 lines
- API Tests: ~800 lines
- Mock Definitions: ~100 lines
- Documentation: ~2,000 lines
- Configuration: ~200 lines

**Total New Code: ~4,400 lines**

## 🎓 Navigation Tips

### To find API tests:
```
cypress/e2e/api/*.cy.ts
```

### To find builders:
```
cypress/support/builders/*Builder.ts
```

### To find schemas:
```
cypress/support/schemas/*Schema.ts
```

### To find mocks:
```
cypress/mocks/{success,error,empty}/*.json
```

### To find documentation:
```
docs/*.md
*.md (root level)
```

## 🔗 File Dependencies

### API Test Dependencies
```
API Test (*.cy.ts)
  ↓
apiClient.ts
  ↓
baseApiClient.ts
  ↓
types.ts
```

### Data Flow
```
Builder Pattern
  ↓
Test Data
  ↓
API Client
  ↓
cy.request()
  ↓
API Response
  ↓
Schema Validation
  ↓
Assertions
```

### Mock Flow
```
Mock Fixture (*.json)
  ↓
mockManager.ts
  ↓
cy.intercept()
  ↓
UI Test
```

## 📋 Maintenance Notes

### Regular Updates Needed
- Update schemas when API changes
- Add new builders for new entities
- Update mocks for new scenarios
- Keep documentation in sync

### Files to Never Commit
- `.env` (contains secrets)
- `node_modules/` (dependencies)
- `reports/` (test results)
- `cypress/screenshots/` (test artifacts)
- `cypress/videos/` (test artifacts)

### Files to Always Commit
- `.env.example` (template)
- All test files
- All support files
- All documentation
- Configuration files

## 🎯 Quick Access

| Purpose | Path |
|---------|------|
| Run API tests | `npm run cy:api` |
| Run UI tests | `npm run cy:ui` |
| View docs | `docs/` folder |
| Quick start | `QUICK_START.md` |
| API reference | `API_TESTING_README.md` |
| Configuration | `config/` folder |
| Mocks | `cypress/mocks/` folder |

---

**Last Updated**: 2025-10-19
**Total Files**: 34 new + 6 updated + original files preserved
