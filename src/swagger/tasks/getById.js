export const getTaskById = {
  '/api/tasks/{id}': {
    get: {
      tags: ['Tareas'],
      summary: 'Obtener tarea por ID',
      description:
        'Devuelve la información de una tarea específica por su ID. Requiere token Bearer.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la tarea a consultar',
          required: true,
          schema: { type: 'integer', example: 38 },
        },
      ],
      responses: {
        200: {
          description: 'Información de la tarea',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Estudiar' },
                  done: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
      },
    },
  },
};
