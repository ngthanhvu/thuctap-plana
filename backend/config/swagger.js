const swaggerJsdoc = require('yamljs');
const swaggerUi = require('swagger-ui-express');

// Load Swagger YAML files
const productSwagger = swaggerJsdoc('./swagger/product.swagger.yaml');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple CRUD API with Swagger documentation'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ]
    },
    apis: ['./swagger/*.yaml'] // files containing annotations as above
};

const specs = swaggerJsdoc.load('./swagger/product.swagger.yaml');

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};