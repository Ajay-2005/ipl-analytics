// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IPL Analytics API',
      version: '1.0.0',
      description: 'Swagger documentation for IPL match and analytics endpoints',
    },
    servers: [
      {
        url: 'https://ipl-analytics.vercel.app',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

