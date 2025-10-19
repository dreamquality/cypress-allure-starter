/**
 * JSON Schema for Post objects
 */

export const postSchema = {
  type: 'object',
  required: ['id', 'userId', 'title', 'body'],
  properties: {
    id: {
      type: 'number',
      minimum: 1,
    },
    userId: {
      type: 'number',
      minimum: 1,
    },
    title: {
      type: 'string',
      minLength: 1,
    },
    body: {
      type: 'string',
      minLength: 1,
    },
  },
};

export const postsArraySchema = {
  type: 'array',
  items: postSchema,
  minItems: 0,
};
