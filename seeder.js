// Externals Imports
const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
// const Publication = require("./Models/Publication");
//const Hospital = require("./Models/Hospital");
//const Department = require("./Models/Departement");
//const Appointment = require("./Models/Appointment");
// const Staff = require("./Models/Staff");
//const Patient = require("./models/Patient");

const Schedule = require("./Models/Schedule");
//const Doctor = require("./Models/Doctor");
//const Availability = require("./Models/Availability");

// const Schedule = require("./Models/Schedule");
//const Doctor = require("./Models/Doctor");

// Load ENV Variables
dotenv.config({ path: "./config/config.env" });

// Load Models

// Read JSON Files
const availabilities = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/availabilities.json`, "utf-8")
);
const publications = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/publications.json`, "utf-8")
);
const hospitals = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/hospitals.json`, "utf-8")
);
const departements = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/departements.json`, "utf-8")
);
const staffs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/staffs.json`, "utf-8")
);
const patients = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/patients.json`, "utf-8")
);
const doctors = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/doctors.json`, "utf-8")
);
 const schedules = JSON.parse(
   fs.readFileSync(`${__dirname}/_data/schedules.json`, "utf-8")
);
//const availability = JSON.parse(
//fs.readFileSync(`${__dirname}/_data/availability.json`, "utf-8")
//);
//const appointment = JSON.parse(
//fs.readFileSync(`${__dirname}/_data/appointment,json`, "utf-8")
//);

// Import Data Into Database
const importData = async () => {
  try {
    //await Availability.create(availabilities);
    // await Doctor.create(doctors);
    // await Publication.create(publications);
    // await Hospital.create(hospitals);

   // await Appointment.create(appointment);
    // await Availability.create(availability);
    //await Department.create(departements);

    //await Department.create(departements);

    // await Staff.create(staffs);
    // await Patient.create(patients);
     await Schedule.create(schedules);
  } catch (error) {
    console.error(error);
  }
};

// Delete Data From Database
const deleteData = async () => {
  try {
    // await Publication.deleteMany();
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
