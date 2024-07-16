const express = require("express");
const { getMe, putMe, deleteMe } = require("../controllers/me");

const { protect } = require("../middleware/auth");

const router = express.Router();

router
  .route("")
  .get(protect, getMe)
  .put(protect, putMe)
  .delete(protect, deleteMe);

module.exports = router;
