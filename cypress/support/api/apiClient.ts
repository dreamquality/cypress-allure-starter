/**
 * API Client
 * Provides specific methods for interacting with JSONPlaceholder API
 * Extends BaseApiClient with domain-specific methods
 */

import { BaseApiClient } from './baseApiClient';
import { User, Post, Comment, Todo, Album, Photo, ApiResponse } from './types';

export class ApiClient extends BaseApiClient {
  constructor() {
    super(Cypress.env('API_BASE_URL') || 'https://jsonplaceholder.typicode.com');
  }

  // ==================== User Endpoints ====================

  /**
   * Get all users
   */
  public getUsers(): Cypress.Chainable<ApiResponse<User[]>> {
    return this.get<User[]>('/users');
  }

  /**
   * Get a specific user by ID
   */
  public getUser(userId: number): Cypress.Chainable<ApiResponse<User>> {
    return this.get<User>(`/users/${userId}`);
  }

  /**
   * Create a new user
   */
  public createUser(userData: Partial<User>): Cypress.Chainable<ApiResponse<User>> {
    return this.post<User>('/users', userData);
  }

  /**
   * Update a user (PUT - full update)
   */
  public updateUser(userId: number, userData: Partial<User>): Cypress.Chainable<ApiResponse<User>> {
    return this.put<User>(`/users/${userId}`, userData);
  }

  /**
   * Partially update a user (PATCH)
   */
  public patchUser(userId: number, userData: Partial<User>): Cypress.Chainable<ApiResponse<User>> {
    return this.patch<User>(`/users/${userId}`, userData);
  }

  /**
   * Delete a user
   */
  public deleteUser(userId: number): Cypress.Chainable<ApiResponse<void>> {
    return this.delete<void>(`/users/${userId}`);
  }

  // ==================== Post Endpoints ====================

  /**
   * Get all posts
   */
  public getPosts(): Cypress.Chainable<ApiResponse<Post[]>> {
    return this.get<Post[]>('/posts');
  }

  /**
   * Get a specific post by ID
   */
  public getPost(postId: number): Cypress.Chainable<ApiResponse<Post>> {
    return this.get<Post>(`/posts/${postId}`);
  }

  /**
   * Get posts by user ID
   */
  public getPostsByUser(userId: number): Cypress.Chainable<ApiResponse<Post[]>> {
    return this.get<Post[]>('/posts', { qs: { userId } });
  }

  /**
   * Create a new post
   */
  public createPost(postData: Partial<Post>): Cypress.Chainable<ApiResponse<Post>> {
    return this.post<Post>('/posts', postData);
  }

  /**
   * Update a post
   */
  public updatePost(postId: number, postData: Partial<Post>): Cypress.Chainable<ApiResponse<Post>> {
    return this.put<Post>(`/posts/${postId}`, postData);
  }

  /**
   * Delete a post
   */
  public deletePost(postId: number): Cypress.Chainable<ApiResponse<void>> {
    return this.delete<void>(`/posts/${postId}`);
  }

  // ==================== Comment Endpoints ====================

  /**
   * Get all comments
   */
  public getComments(): Cypress.Chainable<ApiResponse<Comment[]>> {
    return this.get<Comment[]>('/comments');
  }

  /**
   * Get comments for a specific post
   */
  public getCommentsByPost(postId: number): Cypress.Chainable<ApiResponse<Comment[]>> {
    return this.get<Comment[]>(`/posts/${postId}/comments`);
  }

  /**
   * Create a comment
   */
  public createComment(commentData: Partial<Comment>): Cypress.Chainable<ApiResponse<Comment>> {
    return this.post<Comment>('/comments', commentData);
  }

  // ==================== Todo Endpoints ====================

  /**
   * Get all todos
   */
  public getTodos(): Cypress.Chainable<ApiResponse<Todo[]>> {
    return this.get<Todo[]>('/todos');
  }

  /**
   * Get a specific todo by ID
   */
  public getTodo(todoId: number): Cypress.Chainable<ApiResponse<Todo>> {
    return this.get<Todo>(`/todos/${todoId}`);
  }

  /**
   * Get todos by user ID
   */
  public getTodosByUser(userId: number): Cypress.Chainable<ApiResponse<Todo[]>> {
    return this.get<Todo[]>('/todos', { qs: { userId } });
  }

  /**
   * Create a new todo
   */
  public createTodo(todoData: Partial<Todo>): Cypress.Chainable<ApiResponse<Todo>> {
    return this.post<Todo>('/todos', todoData);
  }

  /**
   * Update a todo
   */
  public updateTodo(todoId: number, todoData: Partial<Todo>): Cypress.Chainable<ApiResponse<Todo>> {
    return this.put<Todo>(`/todos/${todoId}`, todoData);
  }

  /**
   * Delete a todo
   */
  public deleteTodo(todoId: number): Cypress.Chainable<ApiResponse<void>> {
    return this.delete<void>(`/todos/${todoId}`);
  }

  // ==================== Album Endpoints ====================

  /**
   * Get all albums
   */
  public getAlbums(): Cypress.Chainable<ApiResponse<Album[]>> {
    return this.get<Album[]>('/albums');
  }

  /**
   * Get a specific album by ID
   */
  public getAlbum(albumId: number): Cypress.Chainable<ApiResponse<Album>> {
    return this.get<Album>(`/albums/${albumId}`);
  }

  /**
   * Get photos from an album
   */
  public getPhotosByAlbum(albumId: number): Cypress.Chainable<ApiResponse<Photo[]>> {
    return this.get<Photo[]>(`/albums/${albumId}/photos`);
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
