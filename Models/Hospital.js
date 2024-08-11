const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
  },
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Departement",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
