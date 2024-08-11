// External imports
const jwt = require("jsonwebtoken");
// Internal Imports
const Staff = require("../Models/Staff");
const Patient = require("../models/Patient");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc  create login
// @route   post /api/v1/auth/login
// @access  public
exports.postLogin = asyncHandler(async (req, res, next) => {
  let User;
  if (req.headers.route === "staff") {
    User = Staff;
  } else {
    User = Patient;
  }
  if (!req.body.email || !req.body.password)
    // Check if email and password are provided
    return next(new ErrorResponse("Please provide an email and password", 400));

  // Check if user exists
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // Check if user exists
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check if password is correct
  if (!(await user.matchPassword(req.body.password))) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Generate tokens
  const { accessToken, refreshToken } = await user.generateTokens();
  // Send response
  res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
  });
});

// @desc  create register
// @route   post /api/v1/auth/register
// @access  public
exports.postRegister = asyncHandler(async (req, res, next) => {
  let User;
  if (req.headers.route === "staff") {
    User = Staff;
  } else {
    User = Patient;
  }
  if (!req.body.email || !req.body.password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  // Create the user
  const user = await User.create(req.body);

  // Generate tokens
  const { accessToken, refreshToken } = await user.generateTokens();

  // Send response
  res.status(201).json({
    success: true,
    accessToken,
    refreshToken,
  });
});

// @desc  refresh-token
// @route   post /api/v1/auth/refresh-token
// @access  public
exports.refreshAccessToken = asyncHandler(async (req, res, next) => {
  let User;
  if (req.headers.route === "staff") {
    User = Staff;
  } else {
    User = Patient;
  }
  if (!req.headers.refreshtoken) {
    return next(new ErrorResponse("unauthorized request", 401));
  }
  const decoded = jwt.verify(
    req.headers.refreshtoken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new ErrorResponse("Invalid refresh token", 401));
  }

  res.status(200).json({
    success: true,
    ...user.generateTokens(),
  });
});
