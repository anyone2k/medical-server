// use the other schemas to make this one
// this will be the appointment schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  day: {
    type: String,
    required: [true, "Please add a day"],
  },
  // start and end time of the appointment
  startTime: {
    type: Date,
    required: [true, "Please add a start time"],
  },
  endTime: {
    type: Date,
    required: [true, "Please add an end time"],
  },
  reason: {
    type: String,
    required: [true, "Please add a reason for the appointment"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
