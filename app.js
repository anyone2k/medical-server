// External Imports
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Common
const serverVersion = process.env.SERVER_VERSION;
console.log(`Server version: ${serverVersion}`.yellow.bold);

// Connecting the datebase
const connectDB = require("./config/db");
connectDB();

// Constants
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(expressMongoSanitize());
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
  })
);

// Routes
const routesHospital = require("./routes/hospital");
app.use(`${serverVersion}/hospitals`, routesHospital);

const routesDoctor = require("./routes/doctor");
app.use(`${serverVersion}/doctors`, routesDoctor);

const routesAuth = require("./routes/auth");
app.use(`${serverVersion}/auth`, routesAuth);

const routesMe = require("./routes/me");
app.use(`${serverVersion}/me`, routesMe);

// Using the errorHandler middleware
const errorHandler = require("./middleware/error");
app.use(errorHandler);

// Server
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
