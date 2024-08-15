const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
    validate: {
      validator: function (value) {
        return mongoose
          .model("Staff")
          .findById(value)
          .then((staff) => {
            return staff && staff.role === "doctor";
          });
      },
      message: "Only doctors and nurses can have a schedule.",
    },
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
  reservations: [
    {
      patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
      reservedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
