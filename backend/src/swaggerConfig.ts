import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LaDu',
      version: '1.0.0',
      description: 'API documentation for my project',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
