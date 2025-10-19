/**
 * API Tests for Posts endpoint
 * Demonstrates filtering, pagination, and complex queries
 */

import { apiClient } from '../../support/api/apiClient';
import { PostBuilder } from '../../support/builders/postBuilder';
import { postSchema, postsArraySchema } from '../../support/schemas/postSchema';
import { assertSchema } from '../../support/schemas/schemaValidator';

describe('API Tests - Posts', () => {
  describe('GET /posts', () => {
    it('should retrieve all posts successfully', () => {
      apiClient.getPosts().then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Validate schema
        assertSchema(response.body, postsArraySchema);
      });
    });
  });

  describe('GET /posts/:id', () => {
    it('should retrieve a specific post', () => {
      const postId = 1;

      apiClient.getPost(postId).then((response) => {
        expect(response.status).to.equal(200);

        // Validate schema
        assertSchema(response.body, postSchema);

        // Verify post data
        expect(response.body.id).to.equal(postId);
        expect(response.body.title).to.be.a('string');
        expect(response.body.body).to.be.a('string');
        expect(response.body.userId).to.be.a('number');
      });
    });
  });

  describe('GET /posts?userId=:userId', () => {
    it('should filter posts by user ID', () => {
      const userId = 1;

      apiClient.getPostsByUser(userId).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Verify all posts belong to the user
        response.body.forEach((post) => {
          expect(post.userId).to.equal(userId);
        });

        // Validate schema
        assertSchema(response.body, postsArraySchema);
      });
    });

    it('should return empty array for user with no posts', () => {
      const userId = 99999;

      apiClient.getPostsByUser(userId).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.equal(0);
      });
    });
  });

  describe('POST /posts', () => {
    it('should create a new post with Faker data', () => {
      const newPost = PostBuilder.create()
        .withUserId(1)
        .withTitle('Test Post Title')
        .withBody('Test post body content')
        .build();

      apiClient.createPost(newPost).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.equal(newPost.title);
        expect(response.body.body).to.equal(newPost.body);
        expect(response.body.userId).to.equal(newPost.userId);
      });
    });

    it('should create multiple posts with builder pattern', () => {
      const posts = PostBuilder.createMany(3, 1);

      posts.forEach((post) => {
        apiClient.createPost(post).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('id');
        });
      });
    });
  });

  describe('PUT /posts/:id', () => {
    it('should update an existing post', () => {
      const postId = 1;
      const updatedPost = PostBuilder.create()
        .withUserId(1)
        .withTitle('Updated Title')
        .withBody('Updated body content')
        .build();

      apiClient.updatePost(postId, updatedPost).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(postId);
        expect(response.body.title).to.equal(updatedPost.title);
        expect(response.body.body).to.equal(updatedPost.body);
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete a post successfully', () => {
      const postId = 1;

      apiClient.deletePost(postId).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });

  describe('GET /posts/:id/comments', () => {
    it('should retrieve comments for a post', () => {
      const postId = 1;

      apiClient.getCommentsByPost(postId).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        // Verify comments belong to the post
        response.body.forEach((comment) => {
          expect(comment.postId).to.equal(postId);
          expect(comment).to.have.property('id');
          expect(comment).to.have.property('name');
          expect(comment).to.have.property('email');
          expect(comment).to.have.property('body');
        });
      });
    });
  });

  describe('Performance Tests', () => {
    it('should handle concurrent requests efficiently', () => {
      const requests = [
        apiClient.getPost(1),
        apiClient.getPost(2),
        apiClient.getPost(3),
        apiClient.getPost(4),
        apiClient.getPost(5),
      ];

      Promise.all(requests).then((responses) => {
        responses.forEach((response, index) => {
          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(index + 1);
        });
      });
    });

    it('should complete request within acceptable time', () => {
      const startTime = Date.now();

      apiClient.getPosts().then((response) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        expect(response.status).to.equal(200);
        expect(duration).to.be.lessThan(3000); // Less than 3 seconds
      });
    });
  });
});
