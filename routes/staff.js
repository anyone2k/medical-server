const express = require("express");
const Staff = require("../Models/Staff");
const { getStaff } = require("../controllers/staff");
const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { staffProtect, authorize } = require("../middleware/auth");

router.route("/").get(
  advancedResults(Staff, {
    path: "hospital",
    select: "fullName email role",
  }),
  getStaff
);
module.exports = router;
