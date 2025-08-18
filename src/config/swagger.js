const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Final Week Project API",
      version: "1.0.0",
      description: "API documentation for the Final Week Project",
    },
    servers: [{ url: "http://localhost:5000/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [], // No default auth, endpoints can specify individually
  },
  // Include all controller files here
  apis: [
    path.join(__dirname, "../modules/auth/*.controller.js"),
    path.join(__dirname, "../modules/company/*.controller.js"),
    path.join(__dirname, "../modules/employee/*.controller.js"),
    path.join(__dirname, "../modules/skill/*.controller.js"),
  ],
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
}

module.exports = { swaggerUi, specs, setupSwagger };
