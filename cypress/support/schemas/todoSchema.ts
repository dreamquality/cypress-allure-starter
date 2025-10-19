/**
 * JSON Schema for Todo objects
 */

export const todoSchema = {
  type: 'object',
  required: ['id', 'userId', 'title', 'completed'],
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
    completed: {
      type: 'boolean',
    },
  },
};

export const todosArraySchema = {
  type: 'array',
  items: todoSchema,
  minItems: 0,
};
