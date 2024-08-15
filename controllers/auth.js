// External imports
const jwt = require("jsonwebtoken");
// Internal Imports
const Staff = require("../Models/Staff");
const Patient = require("../Models/Patient");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { loginFunction } = require("../utils/userFunctions");

// @desc  create login
// @route   post /api/v1/auth/staff/login
// @access  public
exports.postStaffLogin = asyncHandler(async (req, res, next) => {
  results = await loginFunction(Staff, req);
  res.status(200).json(results);
});

// @desc  create login
// @route   post /api/v1/auth/staff/login
// @access  public
exports.postPatientLogin = asyncHandler(async (req, res, next) => {
  results = await loginFunction(Patient, req);
  res.status(200).json(results);
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
