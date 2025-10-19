/**
 * Base API Client
 * Provides common methods for making HTTP requests with Cypress
 */

import { ApiRequestConfig, ApiResponse } from './types';

export class BaseApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor(baseUrl?: string, defaultHeaders?: Record<string, string>) {
    this.baseUrl = baseUrl || Cypress.env('API_BASE_URL') || '';
    this.defaultHeaders = defaultHeaders || {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    this.defaultTimeout = Cypress.env('API_TIMEOUT') || 10000;
  }

  /**
   * Generic request method
   */
  protected request<T = any>(config: ApiRequestConfig): Cypress.Chainable<ApiResponse<T>> {
    const requestConfig: Partial<Cypress.RequestOptions> = {
      method: config.method,
      url: `${this.baseUrl}${config.url}`,
      headers: { ...this.defaultHeaders, ...config.headers },
      body: config.body,
      qs: config.qs,
      timeout: config.timeout || this.defaultTimeout,
      failOnStatusCode: config.failOnStatusCode !== undefined ? config.failOnStatusCode : true,
    };

    // Add authentication if provided
    if (config.auth) {
      if (config.auth.bearer) {
        requestConfig.headers = {
          ...requestConfig.headers,
          'Authorization': `Bearer ${config.auth.bearer}`,
        };
      } else if (config.auth.username && config.auth.password) {
        requestConfig.auth = {
          username: config.auth.username,
          password: config.auth.password,
        };
      }
    }

    return cy.request(requestConfig).then((response) => {
      return {
        status: response.status,
        body: response.body,
        headers: response.headers,
        duration: response.duration,
      } as ApiResponse<T>;
    });
  }

  /**
   * GET request
   */
  protected get<T = any>(
    url: string,
    config?: Partial<Omit<ApiRequestConfig, 'method' | 'url'>>
  ): Cypress.Chainable<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      ...config,
    });
  }

  /**
   * POST request
   */
  protected post<T = any>(
    url: string,
    body?: any,
    config?: Partial<Omit<ApiRequestConfig, 'method' | 'url' | 'body'>>
  ): Cypress.Chainable<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      body,
      ...config,
    });
  }

  /**
   * PUT request
   */
  protected put<T = any>(
    url: string,
    body?: any,
    config?: Partial<Omit<ApiRequestConfig, 'method' | 'url' | 'body'>>
  ): Cypress.Chainable<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      body,
      ...config,
    });
  }

  /**
   * PATCH request
   */
  protected patch<T = any>(
    url: string,
    body?: any,
    config?: Partial<Omit<ApiRequestConfig, 'method' | 'url' | 'body'>>
  ): Cypress.Chainable<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url,
      body,
      ...config,
    });
  }

  /**
   * DELETE request
   */
  protected delete<T = any>(
    url: string,
    config?: Partial<Omit<ApiRequestConfig, 'method' | 'url'>>
  ): Cypress.Chainable<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
      ...config,
    });
  }

  /**
   * Set or update default headers
   */
  public setHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Set authentication token
   */
  public setAuthToken(token: string): void {
    this.setHeaders({ 'Authorization': `Bearer ${token}` });
  }

  /**
   * Remove authentication
   */
  public removeAuth(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Get base URL
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
