declare namespace Cypress {
    interface Chainable<Subject> {
      softAssert(actualValue: any, expectedValue: any, message: string): Chainable<any>;
      assertAll(): Chainable<any>;
      fillCheckoutForm(): Chainable<void>;
      validateSchema(data: any, schema: any): Chainable<void>;
    }
}

declare namespace Chai {
  interface Assertion {
    matchSchema(schema: any): Assertion;
  }
}