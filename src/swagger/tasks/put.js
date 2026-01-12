export const updateTask = {
  '/api/tasks/{id}': {
    put: {
      tags: ['Tareas'],
      summary: 'Actualizar tarea por ID',
      description:
        'Actualiza completamente una tarea existente. Requiere token Bearer.',
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
                name: { type: 'string', example: 'Trabajar' },
              },
              required: ['name'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Tarea actualizada correctamente',
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
