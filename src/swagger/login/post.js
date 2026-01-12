export const loginUser = {
  '/api/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login de usuario',
      description: 'Autentica un usuario y devuelve un token JWT.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'user' },
                password: { type: 'string', example: '123' },
              },
              required: ['username', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login exitoso, devuelve token JWT',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIs...',
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
