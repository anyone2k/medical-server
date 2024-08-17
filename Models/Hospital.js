const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  address: {
    type: Map,
    of: String,
    required: true,
    default: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  },
  doctors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  ],
  patients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
  ],
  phone_number: {
    type: String,
    required: [true, "Please add a phone_number"],
  },
  departements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Departement",
      required: true,
    },
  ],
  staff: [
    {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
