const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "User Management System",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger-output.json";
const routes = ["./index.cjs"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
