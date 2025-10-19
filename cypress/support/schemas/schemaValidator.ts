/**
 * Schema Validator Utility
 * Provides schema validation using AJV
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize AJV with formats support
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

/**
 * Validate data against a JSON schema
 */
export function validateSchema(data: any, schema: any): {
  valid: boolean;
  errors: any[] | null;
} {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  return {
    valid,
    errors: validate.errors || null,
  };
}

/**
 * Cypress custom command for schema validation
 * Usage: cy.validateSchema(response.body, userSchema)
 */
export function addSchemaValidationCommand(): void {
  Cypress.Commands.add('validateSchema', (data: any, schema: any) => {
    const result = validateSchema(data, schema);

    if (!result.valid) {
      const errorMessages = result.errors
        ?.map((err) => {
          return `${err.instancePath || 'root'} ${err.message}`;
        })
        .join(', ');

      throw new Error(`Schema validation failed: ${errorMessages}`);
    }

    cy.log('✓ Schema validation passed');
  });
}

/**
 * Assert schema validation in tests
 */
export function assertSchema(data: any, schema: any): void {
  const result = validateSchema(data, schema);

  if (!result.valid) {
    const errorMessages = result.errors
      ?.map((err) => {
        const path = err.instancePath || 'root';
        const message = err.message || 'validation error';
        return `  - ${path}: ${message}`;
      })
      .join('\n');

    throw new Error(
      `Schema validation failed:\n${errorMessages}\n\nData: ${JSON.stringify(data, null, 2)}`
    );
  }
}

/**
 * Chai assertion for schema validation
 */
export function addSchemaAssertion(): void {
  chai.Assertion.addMethod('matchSchema', function (schema: any) {
    const obj = this._obj;
    const result = validateSchema(obj, schema);

    this.assert(
      result.valid,
      `expected #{this} to match schema, but validation failed:\n${result.errors
        ?.map((err) => `  - ${err.instancePath || 'root'}: ${err.message}`)
        .join('\n')}`,
      'expected #{this} not to match schema'
    );
  });
}
