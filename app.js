// External Imports
const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const colors = require("colors");
const cors = require("cors");

// Internal Imports
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const routesAuth = require("./routes/auth");
const routesMe = require("./routes/me");
const routesPublications = require("./routes/publications");
// Common
const serverVersion = "/api/v1";
// Connecting the datebase
connectDB();

const app = express();

app.use(cors());

// Mount routers
app.use(express.json());

app.use(`${serverVersion}/auth`, routesAuth);
app.use(`${serverVersion}/publications`, routesPublications);
app.use(`${serverVersion}/me`, routesMe);

// Using the errorHandler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server listen on port : ${PORT} and devmode: ${process.env.NODE_ENV}`
      .yellow.bold
  );
});

// Handling unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`=> Error: ${err.message}\n`.red.underline);
  //Close server & exit process
  server.close(() => process.exit(1));
});
