/**
 * API Tests for Todos endpoint
 * Demonstrates filtering by completion status and user
 */

import { apiClient } from '../../support/api/apiClient';
import { TodoBuilder } from '../../support/builders/todoBuilder';
import { todoSchema, todosArraySchema } from '../../support/schemas/todoSchema';
import { assertSchema } from '../../support/schemas/schemaValidator';

describe('API Tests - Todos', () => {
  describe('GET /todos', () => {
    it('should retrieve all todos successfully', () => {
      apiClient.getTodos().then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Validate schema
        assertSchema(response.body, todosArraySchema);
      });
    });
  });

  describe('GET /todos/:id', () => {
    it('should retrieve a specific todo', () => {
      const todoId = 1;

      apiClient.getTodo(todoId).then((response) => {
        expect(response.status).to.equal(200);

        // Validate schema
        assertSchema(response.body, todoSchema);

        // Verify todo data
        expect(response.body.id).to.equal(todoId);
        expect(response.body.title).to.be.a('string');
        expect(response.body.completed).to.be.a('boolean');
        expect(response.body.userId).to.be.a('number');
      });
    });
  });

  describe('GET /todos?userId=:userId', () => {
    it('should filter todos by user ID', () => {
      const userId = 1;

      apiClient.getTodosByUser(userId).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Verify all todos belong to the user
        response.body.forEach((todo) => {
          expect(todo.userId).to.equal(userId);
        });

        // Validate schema
        assertSchema(response.body, todosArraySchema);
      });
    });
  });

  describe('POST /todos', () => {
    it('should create a completed todo', () => {
      const newTodo = TodoBuilder.create()
        .withUserId(1)
        .withTitle('Complete this task')
        .completed()
        .build();

      apiClient.createTodo(newTodo).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.equal(newTodo.title);
        expect(response.body.completed).to.equal(true);
        expect(response.body.userId).to.equal(newTodo.userId);
      });
    });

    it('should create an incomplete todo', () => {
      const newTodo = TodoBuilder.create()
        .withUserId(1)
        .withTitle('Incomplete task')
        .notCompleted()
        .build();

      apiClient.createTodo(newTodo).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.completed).to.equal(false);
      });
    });

    it('should create multiple todos with builder pattern', () => {
      const todos = TodoBuilder.createMany(5, 1);

      todos.forEach((todo) => {
        apiClient.createTodo(todo).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('id');
        });
      });
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todo to completed', () => {
      const todoId = 1;
      const updatedTodo = TodoBuilder.create()
        .withUserId(1)
        .withTitle('Updated Todo')
        .completed()
        .build();

      apiClient.updateTodo(todoId, updatedTodo).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(todoId);
        expect(response.body.completed).to.equal(true);
      });
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo successfully', () => {
      const todoId = 1;

      apiClient.deleteTodo(todoId).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });

  describe('Business Logic Tests', () => {
    it('should verify completed and incomplete todos exist', () => {
      apiClient.getTodos().then((response) => {
        expect(response.status).to.equal(200);

        const completedTodos = response.body.filter((todo) => todo.completed === true);
        const incompleteTodos = response.body.filter((todo) => todo.completed === false);

        expect(completedTodos.length).to.be.greaterThan(0);
        expect(incompleteTodos.length).to.be.greaterThan(0);

        cy.log(`Completed todos: ${completedTodos.length}`);
        cy.log(`Incomplete todos: ${incompleteTodos.length}`);
      });
    });

    it('should verify todo distribution across users', () => {
      apiClient.getTodos().then((response) => {
        expect(response.status).to.equal(200);

        const userIds = new Set(response.body.map((todo) => todo.userId));
        expect(userIds.size).to.be.greaterThan(1);

        cy.log(`Todos distributed across ${userIds.size} users`);
      });
    });
  });
});
