export const patchUser = {
  '/api/users/{id}': {
    patch: {
      tags: ['Usuarios'],
      summary: 'Actualizar parcialmente usuario por ID',
      description:
        'Actualiza parcialmente un usuario (por ejemplo, su status). Requiere token Bearer.',
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
                status: {
                  type: 'string',
                  enum: ['active', 'inactive'],
                  example: 'active',
                },
              },
              required: ['status'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Usuario actualizado parcialmente',
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
                    example: '2025-12-22T21:21:39.575Z',
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-01-12T01:13:10.723Z',
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
