// use the other schemas to make this one
// this will be the appointment schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dayTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
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
