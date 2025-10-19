# Quick Start Guide - API Testing

Get up and running with API testing in 5 minutes!

## 🚀 Setup (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. (Optional) Edit .env with your settings
nano .env
```

## 🧪 Run Your First Tests (1 minute)

```bash
# Run API tests
npm run cy:api

# Run UI tests
npm run cy:ui

# Run all tests
npm run cy:all

# Open Cypress GUI
npm run cy:open
```

## 📝 Write Your First API Test (2 minutes)

Create `cypress/e2e/api/mytest.cy.ts`:

```typescript
import { apiClient } from '../../support/api/apiClient';
import { UserBuilder } from '../../support/builders/userBuilder';
import { assertSchema } from '../../support/schemas/schemaValidator';
import { userSchema } from '../../support/schemas/userSchema';

describe('My First API Test', () => {
  it('should get users successfully', () => {
    apiClient.getUsers().then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      assertSchema(response.body, userSchema);
    });
  });

  it('should create user with fake data', () => {
    const newUser = UserBuilder.create()
      .withName('Test User')
      .withEmail('test@example.com')
      .build();

    apiClient.createUser(newUser).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
    });
  });
});
```

Run it:
```bash
npm run cy:api
```

## 🎭 Mock API in UI Test

Create `cypress/e2e/tests/myuitest.cy.ts`:

```typescript
import { mockSuccess } from '../../support/api/mockManager';

describe('My UI Test with Mocking', () => {
  it('should display mocked data', () => {
    const mockData = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' }
    ];

    mockSuccess('GET', '**/api/users', mockData, 'getUsers');
    
    // Visit your page
    // cy.visit('/users');
    
    // Wait for mocked API call
    // cy.wait('@getUsers');
    
    cy.log('Mock applied successfully!');
  });
});
```

## 🛠️ Common Patterns

### Pattern 1: Test with Schema Validation

```typescript
it('should validate response schema', () => {
  apiClient.getUser(1).then((response) => {
    assertSchema(response.body, userSchema);
  });
});
```

### Pattern 2: Create Test Data with Builder

```typescript
it('should create data dynamically', () => {
  const user = UserBuilder.create().build();
  apiClient.createUser(user).then((response) => {
    expect(response.status).to.equal(201);
  });
});
```

### Pattern 3: Mock Error Scenario

```typescript
import { mockError } from '../../support/api/mockManager';

it('should handle 404 error', () => {
  mockError('GET', '**/api/users/999', 404, 'Not found');
  // Test error handling
});
```

### Pattern 4: Test Multiple Endpoints

```typescript
it('should test related endpoints', () => {
  apiClient.getUser(1).then((user) => {
    apiClient.getPostsByUser(user.body.id).then((posts) => {
      expect(posts.body).to.be.an('array');
    });
  });
});
```

## 📊 View Reports

```bash
# Generate Allure report
npm run report

# Generate combined report (API + UI)
npm run report:all
```

## 🔧 Configuration

### For Different Environments

```bash
# Development
npm run cy:dev

# Staging
npm run cy:staging

# Production
npm run cy:prod
```

### Environment Variables

Edit `.env`:

```env
API_BASE_URL=https://your-api.com
API_TIMEOUT=10000
AUTH_TOKEN=your-token
```

## 📚 Learn More

- **Full Guide**: See [docs/API_TESTING_GUIDE.md](docs/API_TESTING_GUIDE.md)
- **Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Examples**: Check files in `cypress/e2e/api/`

## 🆘 Common Issues

### Issue: Tests not finding API

**Solution**: Check `API_BASE_URL` in `.env` file

### Issue: Schema validation failing

**Solution**: Verify your schema matches the API response structure

### Issue: Mocks not working

**Solution**: Ensure `cy.intercept()` is called before the request

## 🎓 Next Steps

1. ✅ Run existing tests
2. ✅ Write your first API test
3. ✅ Add schema validation
4. ✅ Try mocking in UI tests
5. ✅ Create data builders for your domain
6. ✅ Set up CI/CD
7. ✅ Read the full documentation

## 💡 Pro Tips

1. **Use Faker for dynamic data** - Keep tests realistic
2. **Always validate schemas** - Catch API changes early
3. **Mock for UI tests** - Faster and more reliable
4. **Use real APIs for integration** - Validate contracts
5. **Organize by domain** - One file per resource

## 🤝 Need Help?

- Check the [API Testing Guide](docs/API_TESTING_GUIDE.md)
- Review [example tests](cypress/e2e/api/)
- Open an issue on GitHub

---

**Ready to test? Run `npm run cy:api` and see it in action!** 🚀
