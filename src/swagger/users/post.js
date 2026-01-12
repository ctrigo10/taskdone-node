export const createUser = {
  '/api/users': {
    post: {
      tags: ['Usuarios'],
      summary: 'Crear un nuevo usuario',
      description:
        'Crea un usuario con username y password. Devuelve el usuario creado.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'user' },
                password: { type: 'string', example: 'password' },
              },
              required: ['username', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Usuario creado correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  username: { type: 'string', example: 'user' },
                  status: { type: 'string', example: 'active' },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-01-12T00:28:39.059Z',
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-01-12T00:28:39.059Z',
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
