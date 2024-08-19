const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  days: {
    sun: {
      type: Boolean,
      required: true,
    },
    mon: {
      type: Boolean,
      required: true,
    },
    tue: {
      type: Boolean,
      required: true,
    },
    wed: {
      type: Boolean,
      required: true,
    },
    thu: {
      type: Boolean,
      required: true,
    },
    fri: {
      type: Boolean,
      required: true,
    },
    sat: {
      type: Boolean,
      required: true,
    },
  },
});

module.exports = mongoose.model("Availability", AvailabilitySchema);
