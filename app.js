// External Imports
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
var cors = require("cors");

// Internal Imports
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Connecting the datebase
connectDB();

const app = express();

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
