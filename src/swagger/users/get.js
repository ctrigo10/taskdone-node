export const getUsers = {
  '/api/users': {
    get: {
      tags: ['Usuarios'],
      summary: 'Obtener lista de usuarios',
      description:
        'Obtiene la lista de usuarios con filtros opcionales y paginación.',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'Cantidad máxima de registros por página',
          required: false,
          schema: { type: 'integer', default: 10, example: 10 },
        },
        {
          name: 'page',
          in: 'query',
          description: 'Número de página',
          required: false,
          schema: { type: 'integer', default: 1, example: 1 },
        },
        {
          name: 'orderby',
          in: 'query',
          description: 'Campo para ordenar',
          required: false,
          schema: { type: 'string', default: 'id', example: 'id' },
        },
        {
          name: 'orderDir',
          in: 'query',
          description: 'Dirección del ordenamiento (ASC o DESC)',
          required: false,
          schema: { type: 'string', default: 'DESC', example: 'DESC' },
        },
        {
          name: 'search',
          in: 'query',
          description: 'Texto para buscar dentro de los usernames',
          required: false,
          schema: { type: 'string', example: 'ctr' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filtrar por estado del usuario',
          required: false,
          schema: {
            type: 'string',
            enum: ['active', 'inactive'],
            default: 'active',
            example: 'active',
          },
        },
      ],
      responses: {
        200: {
          description: 'Lista paginada de usuarios',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  total: { type: 'integer', example: 2 },
                  page: { type: 'integer', example: 1 },
                  pages: { type: 'integer', example: 1 },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        username: { type: 'string', example: 'ctrigo' },
                        status: { type: 'string', example: 'active' },
                      },
                    },
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
