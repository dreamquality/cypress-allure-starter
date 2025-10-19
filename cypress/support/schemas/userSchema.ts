/**
 * JSON Schema for User objects
 */

export const userSchema = {
  type: 'object',
  required: ['id', 'name', 'username', 'email'],
  properties: {
    id: {
      type: 'number',
      minimum: 1,
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    username: {
      type: 'string',
      minLength: 1,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        suite: { type: 'string' },
        city: { type: 'string' },
        zipcode: { type: 'string' },
        geo: {
          type: 'object',
          properties: {
            lat: { type: 'string' },
            lng: { type: 'string' },
          },
          required: ['lat', 'lng'],
        },
      },
    },
    phone: {
      type: 'string',
    },
    website: {
      type: 'string',
    },
    company: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        catchPhrase: { type: 'string' },
        bs: { type: 'string' },
      },
    },
  },
};

export const usersArraySchema = {
  type: 'array',
  items: userSchema,
  minItems: 0,
};
