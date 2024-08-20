import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Api Gateway',
        description: 'Documentation for the Api Gateway',
    },
    servers: [
        {
            url: 'http://localhost:8080/api',
            description: ''
        },
    ],
    definitions: {
        Order: {
            user_id: 1,
            number_of_items: 2,
            total_amount: 100,
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../billing-app/app/routes/orders.ts', '../inventory-app/app/routes/movie.ts', './routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);
