const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: true,
    },
diagnostic: {
    type: String,
    required: [true, "Please add a diagnostic"],
    },
treatment: {
type: String,
required: [true, "Please add a treatment"],
},
 
});

module.exports = mongoose.model("Report", ReportSchema);
