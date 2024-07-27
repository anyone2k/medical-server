// Externals Imports
const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Publication = require("./Models/Publication");

// Load ENV Variables
dotenv.config({ path: "./config/config.env" });

// Load Models

// Read JSON Files
const publications = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/publications.json`, "utf-8")
);

// Import Data Into Database
const importData = async () => {
  try {
    await Publication.create(publications);
    console.log("Data Imported...".green.inverse);
  } catch (error) {
    console.error(error);
  }
};

// Delete Data From Database
const deleteData = async () => {
  try {
    await Publication.deleteMany();
    console.log("Data Destroyed...".red.inverse);
  } catch (error) {
    console.error(error);
  }
};

// Main Function
const main = async () => {
  // Connect To MongoDB Database
  await mongoose.connect(process.env.MONGO_URI);
  switch (process.argv[2]) {
    case "-i":
      await importData();
      break;
    case "-d":
      await deleteData();
      break;
    case "-b":
      await deleteData();
      await importData();
      break;
    default:
      console.log("Invalid Command".red.inverse);
  }
  // Close Connection
  process.exit();
};
// Run Main Function
main();
