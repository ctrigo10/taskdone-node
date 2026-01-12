export const deleteTask = {
  '/api/tasks/{id}': {
    delete: {
      tags: ['Tareas'],
      summary: 'Eliminar tarea por ID',
      description: 'Elimina una tarea existente. Requiere token Bearer.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la tarea a eliminar',
          required: true,
          schema: { type: 'integer', example: 48 },
        },
      ],
      responses: {
        204: {
          description:
            'Tarea eliminada correctamente, sin contenido en la respuesta',
        },
      },
    },
  },
};
