// External imports
const express = require("express");
// Internal imports
const {
  postLogin,
  postRegister,
  refreshAccessToken,
} = require("../controllers/auth");

const router = express.Router();

router.route("/login").post(postLogin);

router.route("/register").post(postRegister);

router.route("/refresh-token").get(refreshAccessToken);

module.exports = router;
