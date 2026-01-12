export const patchTask = {
  '/api/tasks/{id}': {
    patch: {
      tags: ['Tareas'],
      summary: 'Actualizar parcialmente tarea por ID',
      description:
        'Actualiza parcialmente una tarea (por ejemplo, marcarla como done). Requiere token Bearer.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la tarea a actualizar',
          required: true,
          schema: { type: 'integer', example: 38 },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                done: { type: 'boolean', example: true },
              },
              required: ['done'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Tarea actualizada parcialmente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { type: 'integer', example: 1 },
                description: 'Cantidad de registros actualizados',
              },
            },
          },
        },
      },
    },
  },
};
