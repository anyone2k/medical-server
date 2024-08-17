const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BedSchema = new Schema({
hospital: {
    type: mongoose.Schema.ObjectId,
    ref: "Hospital",
    required: true,
    },
  bed_number: {
    type: Number,
    required: [true, "Please add a bed  number"],
  },
  occupied: {
    type: Boolean, 
    required: [true, "Please specify if the bed is occupied"],
    default: false,
  },
  
});

module.exports = mongoose.model("Bed", BedSchema);
