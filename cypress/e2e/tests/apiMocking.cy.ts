/**
 * UI Tests with API Mocking
 * Demonstrates how to use cy.intercept() to mock API calls in UI tests
 */

import { mockSuccess, mockError, mockEmpty, mockNetworkFailure } from '../../support/api/mockManager';

describe('UI Tests with API Mocking', () => {
  describe('Success Scenarios', () => {
    it('should display mocked user data', () => {
      // Load mock data from fixture
      cy.fixture('mocks/success/users').then((mockUsers) => {
        // Mock the API call
        mockSuccess('GET', '**/api/users', mockUsers, 'getUsers');

        // Visit the page (adjust URL based on your app)
        // cy.visit('/users');

        // Wait for the intercepted call
        // cy.wait('@getUsers');

        // Verify the mocked data is displayed
        // Add assertions based on your UI
        cy.log('Mocked users successfully loaded');
      });
    });

    it('should handle successful post creation', () => {
      cy.fixture('mocks/success/posts').then((mockPosts) => {
        mockSuccess('GET', '**/api/posts', mockPosts, 'getPosts');

        // Simulate UI interactions
        // cy.visit('/posts');
        // cy.wait('@getPosts');

        cy.log('Mocked posts successfully loaded');
      });
    });
  });

  describe('Error Scenarios', () => {
    it('should display error message when API returns 404', () => {
      cy.fixture('mocks/error/notFound').then((errorResponse) => {
        mockError('GET', '**/api/users/999', 404, errorResponse.message, 'getUserError');

        // Visit the page
        // cy.visit('/users/999');

        // Wait for the error
        // cy.wait('@getUserError');

        // Verify error message is displayed
        // cy.contains('Resource not found').should('be.visible');

        cy.log('404 error handled correctly');
      });
    });

    it('should handle server errors gracefully', () => {
      cy.fixture('mocks/error/serverError').then((errorResponse) => {
        mockError('GET', '**/api/users', 500, errorResponse.message, 'serverError');

        // Visit the page
        // cy.visit('/users');

        // Wait for the error
        // cy.wait('@serverError');

        // Verify error state
        // cy.contains('An unexpected error occurred').should('be.visible');

        cy.log('500 error handled correctly');
      });
    });

    it('should handle network failures', () => {
      mockNetworkFailure('GET', '**/api/users', 'networkError');

      // Visit the page
      // cy.visit('/users');

      // Verify network error handling
      cy.log('Network failure simulated');
    });
  });

  describe('Empty State Scenarios', () => {
    it('should display empty state when no data is available', () => {
      cy.fixture('mocks/empty/emptyArray').then((emptyData) => {
        mockSuccess('GET', '**/api/users', emptyData, 'emptyUsers');

        // Visit the page
        // cy.visit('/users');

        // Wait for the response
        // cy.wait('@emptyUsers');

        // Verify empty state is displayed
        // cy.contains('No users found').should('be.visible');

        cy.log('Empty state handled correctly');
      });
    });
  });

  describe('Loading States', () => {
    it('should display loading spinner during API call', () => {
      cy.fixture('mocks/success/users').then((mockUsers) => {
        // Mock with delay to test loading state
        cy.intercept('GET', '**/api/users', {
          statusCode: 200,
          body: mockUsers,
          delay: 2000, // 2 second delay
        }).as('delayedUsers');

        // Visit the page
        // cy.visit('/users');

        // Verify loading spinner appears
        // cy.get('[data-testid="loading-spinner"]').should('be.visible');

        // Wait for the response
        // cy.wait('@delayedUsers');

        // Verify loading spinner disappears
        // cy.get('[data-testid="loading-spinner"]').should('not.exist');

        cy.log('Loading state tested successfully');
      });
    });
  });

  describe('Conditional Mocking', () => {
    it('should mock different responses based on request parameters', () => {
      // Mock different responses for different users
      cy.intercept('GET', '**/api/users/1', {
        statusCode: 200,
        body: {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
        },
      }).as('getAdminUser');

      cy.intercept('GET', '**/api/users/2', {
        statusCode: 200,
        body: {
          id: 2,
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user',
        },
      }).as('getRegularUser');

      // Test with admin user
      // cy.visit('/users/1');
      // cy.wait('@getAdminUser');
      // cy.contains('Admin User').should('be.visible');

      // Test with regular user
      // cy.visit('/users/2');
      // cy.wait('@getRegularUser');
      // cy.contains('Regular User').should('be.visible');

      cy.log('Conditional mocking tested successfully');
    });
  });

  describe('Complex Scenarios', () => {
    it('should mock multiple API calls in sequence', () => {
      cy.fixture('mocks/success/users').then((mockUsers) => {
        cy.fixture('mocks/success/posts').then((mockPosts) => {
          // Mock users endpoint
          mockSuccess('GET', '**/api/users', mockUsers, 'getUsers');

          // Mock posts endpoint
          mockSuccess('GET', '**/api/posts', mockPosts, 'getPosts');

          // Visit the page
          // cy.visit('/dashboard');

          // Wait for both API calls
          // cy.wait(['@getUsers', '@getPosts']);

          // Verify both sets of data are displayed
          cy.log('Multiple API calls mocked successfully');
        });
      });
    });

    it('should mock POST request and verify UI update', () => {
      const newUser = {
        id: 11,
        name: 'New User',
        email: 'newuser@example.com',
      };

      cy.intercept('POST', '**/api/users', {
        statusCode: 201,
        body: newUser,
      }).as('createUser');

      // Visit the page
      // cy.visit('/users/create');

      // Fill form
      // cy.get('[name="name"]').type(newUser.name);
      // cy.get('[name="email"]').type(newUser.email);
      // cy.get('[type="submit"]').click();

      // Wait for the API call
      // cy.wait('@createUser');

      // Verify success message
      // cy.contains('User created successfully').should('be.visible');

      cy.log('POST request mocked successfully');
    });
  });

  describe('Advanced Mocking Techniques', () => {
    it('should modify response headers', () => {
      cy.intercept('GET', '**/api/users', (req) => {
        req.reply({
          statusCode: 200,
          body: [],
          headers: {
            'X-Custom-Header': 'Custom Value',
            'X-Total-Count': '0',
          },
        });
      }).as('customHeaders');

      // Verify custom headers if needed
      cy.log('Custom headers added to mock response');
    });

    it('should dynamically generate mock responses', () => {
      cy.intercept('GET', '**/api/users/**', (req) => {
        const userId = req.url.split('/').pop();
        req.reply({
          statusCode: 200,
          body: {
            id: parseInt(userId || '1'),
            name: `User ${userId}`,
            email: `user${userId}@example.com`,
          },
        });
      }).as('dynamicUser');

      cy.log('Dynamic mock response generated');
    });

    it('should simulate slow network conditions', () => {
      cy.intercept('GET', '**/api/users', (req) => {
        req.reply({
          statusCode: 200,
          body: [],
          delay: 5000, // 5 second delay
          throttleKbps: 50, // Slow network
        });
      }).as('slowNetwork');

      cy.log('Slow network conditions simulated');
    });
  });
});
