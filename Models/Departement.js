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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Departement", DepartementSchema);
