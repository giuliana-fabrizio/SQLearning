const dotenv = require('dotenv');
const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// ======================================================================= Load environment variables

dotenv.config();
const port = process.env.PORT;
const swagger_port = process.env.SWAGGER_PORT;

// ======================================================================= Swagger doc

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "API - Route Testing",
            description: "API documentation",
            servers: [`http://localhost:${swagger_port}/`],
        },
    }),
    apis: ["index.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);

// ======================================================================= Application setup

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server is listenning on ${port} port.`);
});