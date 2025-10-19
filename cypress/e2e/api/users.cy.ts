/**
 * API Tests for Users endpoint
 * Demonstrates GET, POST, PUT, PATCH, DELETE operations with schema validation
 */

import { apiClient } from '../../support/api/apiClient';
import { UserBuilder } from '../../support/builders/userBuilder';
import { userSchema, usersArraySchema } from '../../support/schemas/userSchema';
import { assertSchema } from '../../support/schemas/schemaValidator';

describe('API Tests - Users', () => {
  describe('GET /users', () => {
    it('should retrieve all users successfully', () => {
      apiClient.getUsers().then((response) => {
        // Verify status code
        expect(response.status).to.equal(200);

        // Verify response is an array
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Validate schema
        assertSchema(response.body, usersArraySchema);

        // Verify first user has expected properties
        const firstUser = response.body[0];
        expect(firstUser).to.have.property('id');
        expect(firstUser).to.have.property('name');
        expect(firstUser).to.have.property('email');
        expect(firstUser).to.have.property('username');
      });
    });

    it('should have reasonable response time', () => {
      apiClient.getUsers().then((response) => {
        expect(response.status).to.equal(200);
        expect(response.duration).to.be.lessThan(3000); // Less than 3 seconds
      });
    });
  });

  describe('GET /users/:id', () => {
    it('should retrieve a specific user by ID', () => {
      const userId = 1;

      apiClient.getUser(userId).then((response) => {
        // Verify status code
        expect(response.status).to.equal(200);

        // Validate schema
        assertSchema(response.body, userSchema);

        // Verify user data
        expect(response.body.id).to.equal(userId);
        expect(response.body.name).to.be.a('string');
        expect(response.body.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    it('should return 404 for non-existent user', () => {
      apiClient
        .getUser(99999)
        .then(() => {
          throw new Error('Should have failed with 404');
        })
        .catch((error) => {
          expect(error.status).to.equal(404);
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user successfully', () => {
      const newUser = UserBuilder.create().withName('John Doe').withEmail('john@example.com').build();

      apiClient.createUser(newUser).then((response) => {
        // Verify status code (JSONPlaceholder returns 201)
        expect(response.status).to.equal(201);

        // Verify response contains an ID
        expect(response.body).to.have.property('id');
        expect(response.body.id).to.be.a('number');

        // Verify posted data is returned
        expect(response.body.name).to.equal(newUser.name);
        expect(response.body.email).to.equal(newUser.email);
      });
    });

    it('should create user with minimal data', () => {
      const minimalUser = UserBuilder.createMinimal();

      apiClient.createUser(minimalUser).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
      });
    });

    it('should create user with Faker-generated data', () => {
      const fakerUser = UserBuilder.create().build();

      apiClient.createUser(fakerUser).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.equal(fakerUser.name);
        expect(response.body.email).to.equal(fakerUser.email);

        // Log for debugging
        cy.log('Created user:', JSON.stringify(response.body, null, 2));
      });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user completely', () => {
      const userId = 1;
      const updatedUser = UserBuilder.create()
        .withName('Updated Name')
        .withEmail('updated@example.com')
        .build();

      apiClient.updateUser(userId, updatedUser).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(userId);
        expect(response.body.name).to.equal(updatedUser.name);
        expect(response.body.email).to.equal(updatedUser.email);
      });
    });
  });

  describe('PATCH /users/:id', () => {
    it('should partially update a user', () => {
      const userId = 1;
      const partialUpdate = {
        name: 'Partially Updated Name',
      };

      apiClient.patchUser(userId, partialUpdate).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(userId);
        expect(response.body.name).to.equal(partialUpdate.name);
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user successfully', () => {
      const userId = 1;

      apiClient.deleteUser(userId).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid endpoints gracefully', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('API_BASE_URL')}/invalid-endpoint`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('should handle malformed requests', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_BASE_URL')}/users`,
        body: { invalid: 'data' },
        failOnStatusCode: false,
      }).then((response) => {
        // JSONPlaceholder accepts all data, but in a real API this would fail
        expect(response.status).to.be.oneOf([201, 400, 422]);
      });
    });
  });
});
