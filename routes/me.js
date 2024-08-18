const express = require("express");
const { getMe, putMe, deleteMe } = require("../controllers/me");

const { protect, staffProtect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getMe).put(protect, putMe);
router.route("/staff").get(staffProtect, getMe);

module.exports = router;
