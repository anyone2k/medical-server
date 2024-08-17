const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartementSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  headOfDepartement: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  staff: [
    {
      type: Schema.Types.ObjectId,
      ref: "Staff",
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
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Departement", DepartementSchema);
