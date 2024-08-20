const express = require("express");
const Staff = require("../Models/Staff");
const { getStaff, getStaffById, createStaff } = require("../controllers/staff");
const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { staffProtect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Staff, {
      path: "hospital",
      select: "name email role",
    }),
    getStaff
  )
  .post(staffProtect, authorize("admin"), createStaff);
router.route("/:id").get(staffProtect, authorize("admin"), getStaffById);

module.exports = router;
