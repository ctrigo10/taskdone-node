export const getTasks = {
  '/api/tasks': {
    get: {
      tags: ['Tareas'],
      summary: 'Obtener lista de tareas',
      description:
        'Obtiene la lista de tareas del usuario autenticado con filtros opcionales y paginación.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'done',
          in: 'query',
          description: 'Filtrar por estado de la tarea (true o false)',
          required: false,
          schema: { type: 'boolean', example: true },
        },
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
          description: 'Buscar por nombre de la tarea',
          required: false,
          schema: { type: 'string', example: 'Estudi' },
        },
      ],
      responses: {
        200: {
          description: 'Lista paginada de tareas',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  total: { type: 'integer', example: 1 },
                  page: { type: 'integer', example: 1 },
                  pages: { type: 'integer', example: 1 },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 38 },
                        name: { type: 'string', example: 'Estudiar' },
                        done: { type: 'boolean', example: false },
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
