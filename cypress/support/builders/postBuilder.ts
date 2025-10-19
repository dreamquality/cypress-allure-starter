/**
 * Post Data Builder
 * Uses the Builder pattern with Faker for generating dynamic test data
 */

import { faker } from '@faker-js/faker';
import { Post } from '../api/types';

export class PostBuilder {
  private post: Partial<Post>;

  constructor() {
    this.post = {
      userId: faker.number.int({ min: 1, max: 10 }),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
    };
  }

  /**
   * Set post ID
   */
  public withId(id: number): this {
    this.post.id = id;
    return this;
  }

  /**
   * Set user ID
   */
  public withUserId(userId: number): this {
    this.post.userId = userId;
    return this;
  }

  /**
   * Set title
   */
  public withTitle(title: string): this {
    this.post.title = title;
    return this;
  }

  /**
   * Set body
   */
  public withBody(body: string): this {
    this.post.body = body;
    return this;
  }

  /**
   * Build the post object
   */
  public build(): Partial<Post> {
    return { ...this.post };
  }

  /**
   * Build and return as full Post (with required fields)
   */
  public buildFull(): Post {
    return {
      id: this.post.id || faker.number.int({ min: 1, max: 10000 }),
      userId: this.post.userId || faker.number.int({ min: 1, max: 10 }),
      title: this.post.title || faker.lorem.sentence(),
      body: this.post.body || faker.lorem.paragraphs(2),
    };
  }

  /**
   * Static method to create a new builder
   */
  public static create(): PostBuilder {
    return new PostBuilder();
  }

  /**
   * Static method to create an array of posts
   */
  public static createMany(count: number, userId?: number): Partial<Post>[] {
    return Array.from({ length: count }, () => {
      const builder = PostBuilder.create();
      if (userId) {
        builder.withUserId(userId);
      }
      return builder.build();
    });
  }
}
