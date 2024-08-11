const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  day: {
    type: String,
    required: [true, "Please add a day"],
  },
  startTime: {
    type: String,
    required: [true, "Please add a start time"],
  },
  endTime: {
    type: String,
    required: [true, "Please add an end time"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
