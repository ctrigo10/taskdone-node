export const updateUser = {
  '/api/users/{id}': {
    put: {
      tags: ['Usuarios'],
      summary: 'Actualizar usuario por ID',
      description: 'Actualiza un usuario existente. Requiere token Bearer.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID del usuario a actualizar',
          required: true,
          schema: { type: 'integer', example: 1 },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'ctrigo' },
                password: { type: 'string', example: '123' },
              },
              required: ['username', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Usuario actualizado correctamente',
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
