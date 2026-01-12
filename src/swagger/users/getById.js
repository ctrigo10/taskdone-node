export const getUserById = {
  '/api/users/{id}': {
    get: {
      tags: ['Usuarios'],
      summary: 'Obtener usuario por ID',
      description:
        'Devuelve la información de un usuario específico por su ID. Requiere token Bearer.',
      security: [
        {
          bearerAuth: [], // Swagger reconoce que requiere Authorization: Bearer <token>
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID del usuario a consultar',
          required: true,
          schema: { type: 'integer', example: 1 },
        },
      ],
      responses: {
        200: {
          description: 'Información del usuario',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', example: 'user' },
                  status: { type: 'string', example: 'active' },
                },
              },
            },
          },
        },
      },
    },
  },
};
