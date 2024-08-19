const express = require("express");
const Hospital = require("../Models/Hospital");
const advancedResults = require("../middleware/advancedResults");
const { getSearch } = require("../controllers/search");

const router = express.Router({ mergeParams: true });
const { staffProtect, authorize } = require("../middleware/auth");
const Doctor = require("../Models/Doctor");

router.route("/").get(advancedResults(Hospital), getSearch);
router.route("/query").get(advancedResults(Doctor), getSearch);

module.exports = router;
