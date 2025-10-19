/**
 * Mock Manager
 * Centralized management of API mocks using cy.intercept()
 */

export interface MockConfig {
  method: string;
  url: string;
  response: any;
  statusCode?: number;
  delay?: number;
  headers?: Record<string, string>;
  alias?: string;
}

export class MockManager {
  private mocks: Map<string, MockConfig> = new Map();

  /**
   * Register a mock
   */
  public register(name: string, config: MockConfig): void {
    this.mocks.set(name, config);
  }

  /**
   * Apply a registered mock
   */
  public apply(name: string): void {
    const config = this.mocks.get(name);
    if (!config) {
      throw new Error(`Mock "${name}" not found`);
    }

    cy.intercept(
      config.method,
      config.url,
      {
        statusCode: config.statusCode || 200,
        body: config.response,
        headers: config.headers || { 'Content-Type': 'application/json' },
        delay: config.delay,
      }
    ).as(config.alias || name);
  }

  /**
   * Apply multiple mocks
   */
  public applyMany(names: string[]): void {
    names.forEach((name) => this.apply(name));
  }

  /**
   * Clear all mocks
   */
  public clear(): void {
    this.mocks.clear();
  }

  /**
   * Get a mock configuration
   */
  public get(name: string): MockConfig | undefined {
    return this.mocks.get(name);
  }

  /**
   * Check if a mock exists
   */
  public has(name: string): boolean {
    return this.mocks.has(name);
  }
}

// Export singleton instance
export const mockManager = new MockManager();

/**
 * Helper function to create a mock interceptor
 */
export function mockApi(config: MockConfig): void {
  cy.intercept(
    config.method,
    config.url,
    {
      statusCode: config.statusCode || 200,
      body: config.response,
      headers: config.headers || { 'Content-Type': 'application/json' },
      delay: config.delay,
    }
  ).as(config.alias || 'apiMock');
}

/**
 * Helper function to mock a successful response
 */
export function mockSuccess<T>(
  method: string,
  url: string,
  response: T,
  alias?: string
): void {
  mockApi({
    method,
    url,
    response,
    statusCode: 200,
    alias,
  });
}

/**
 * Helper function to mock an error response
 */
export function mockError(
  method: string,
  url: string,
  statusCode: number,
  errorMessage: string,
  alias?: string
): void {
  mockApi({
    method,
    url,
    response: { error: errorMessage },
    statusCode,
    alias,
  });
}

/**
 * Helper function to mock an empty response
 */
export function mockEmpty(method: string, url: string, alias?: string): void {
  mockApi({
    method,
    url,
    response: [],
    statusCode: 200,
    alias,
  });
}

/**
 * Helper function to mock a network failure
 */
export function mockNetworkFailure(method: string, url: string, alias?: string): void {
  cy.intercept(method, url, { forceNetworkError: true }).as(alias || 'networkError');
}
