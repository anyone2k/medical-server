const express = require("express");
const Schedule = require("../Models/Schedule");
const {
  getSchedules,
  createSchedule,
  updateSchedule,
} = require("../controllers/schedule");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { staffProtect } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Schedule), getSchedules)
  .post(staffProtect, createSchedule);
router
  .route("/:id")
  //   .get(getSchedule)
  .put(staffProtect, updateSchedule);
//   .delete(staffProtect, deleteSchedule);

module.exports = router;
