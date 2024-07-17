const express = require("express");
const { getMe, putMe, deleteMe } = require("../controllers/me");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("").get(getMe).put(putMe).delete(deleteMe);

module.exports = router;
