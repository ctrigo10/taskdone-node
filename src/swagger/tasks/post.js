export const createTask = {
  '/api/tasks': {
    post: {
      tags: ['Tareas'],
      summary: 'Crear una nueva tarea',
      description:
        'Crea una tarea asociada al usuario autenticado. Requiere token Bearer.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Estudiar' },
              },
              required: ['name'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Tarea creada correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 38 },
                  name: { type: 'string', example: 'Estudiar' },
                  done: { type: 'boolean', example: false },
                  userId: { type: 'integer', example: 4 },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-01-12T01:22:37.180Z',
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-01-12T01:22:37.180Z',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
