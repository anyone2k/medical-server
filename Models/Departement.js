const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartementSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  headOfDepartement: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Departement", DepartementSchema);
