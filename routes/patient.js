const express = require("express");
const Patient = require("../Models/Patient");
const { getPatients } = require("../controllers/patient");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { staffProtect, authorize } = require("../middleware/auth");

router.route("/").get(
  advancedResults(Patient, {
    path: "hospital",
    select: "name email role",
  }),
  getPatients
);
module.exports = router;
