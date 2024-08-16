const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalFileSchema = new Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient", 
    required: true,
  },
  blood_type: {
    type: String,
    required: [true, "Please provide the blood type"],
  },
  allergies: {
    type: [String],
    default: [],   
  },
  reports: [{
    type: mongoose.Schema.ObjectId, // Liste des identifiants de rapports
    ref: "Report",
  }],
  last_medical_visit: {
    type: Date, // Utilisation du type Date pour la dernière visite médicale
    required: true,
  },
});

module.exports = mongoose.model("MedicalFile", MedicalFileSchema);
