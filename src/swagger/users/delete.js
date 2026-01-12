export const deleteUser = {
  '/api/users/{id}': {
    delete: {
      tags: ['Usuarios'],
      summary: 'Eliminar usuario por ID',
      description: 'Elimina un usuario existente. Requiere token Bearer.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID del usuario a eliminar',
          required: true,
          schema: { type: 'integer', example: 3 },
        },
      ],
      responses: {
        204: {
          description:
            'Usuario eliminado correctamente, sin contenido en la respuesta',
        },
      },
    },
  },
};
