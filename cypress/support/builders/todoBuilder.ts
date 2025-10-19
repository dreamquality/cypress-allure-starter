/**
 * Todo Data Builder
 * Uses the Builder pattern with Faker for generating dynamic test data
 */

import { faker } from '@faker-js/faker';
import { Todo } from '../api/types';

export class TodoBuilder {
  private todo: Partial<Todo>;

  constructor() {
    this.todo = {
      userId: faker.number.int({ min: 1, max: 10 }),
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      completed: faker.datatype.boolean(),
    };
  }

  /**
   * Set todo ID
   */
  public withId(id: number): this {
    this.todo.id = id;
    return this;
  }

  /**
   * Set user ID
   */
  public withUserId(userId: number): this {
    this.todo.userId = userId;
    return this;
  }

  /**
   * Set title
   */
  public withTitle(title: string): this {
    this.todo.title = title;
    return this;
  }

  /**
   * Set completed status
   */
  public withCompleted(completed: boolean): this {
    this.todo.completed = completed;
    return this;
  }

  /**
   * Mark as completed
   */
  public completed(): this {
    this.todo.completed = true;
    return this;
  }

  /**
   * Mark as not completed
   */
  public notCompleted(): this {
    this.todo.completed = false;
    return this;
  }

  /**
   * Build the todo object
   */
  public build(): Partial<Todo> {
    return { ...this.todo };
  }

  /**
   * Build and return as full Todo (with required fields)
   */
  public buildFull(): Todo {
    return {
      id: this.todo.id || faker.number.int({ min: 1, max: 10000 }),
      userId: this.todo.userId || faker.number.int({ min: 1, max: 10 }),
      title: this.todo.title || faker.lorem.sentence({ min: 3, max: 8 }),
      completed: this.todo.completed !== undefined ? this.todo.completed : false,
    };
  }

  /**
   * Static method to create a new builder
   */
  public static create(): TodoBuilder {
    return new TodoBuilder();
  }

  /**
   * Static method to create an array of todos
   */
  public static createMany(count: number, userId?: number): Partial<Todo>[] {
    return Array.from({ length: count }, () => {
      const builder = TodoBuilder.create();
      if (userId) {
        builder.withUserId(userId);
      }
      return builder.build();
    });
  }
}
