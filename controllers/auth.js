// External imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Internal Imports
const User = require("../Models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { generateAccessAndRefreshToken } = require("../utils/auth");

// @desc  create login
// @route   post /api/v1/auth/login
// @access  public
exports.postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body || {};
  const findbyEmail = await User.findOne({ email: email });
  if (findbyEmail !== null) {
    await bcrypt.compare(
      password,
      findbyEmail.password,
      function (err, result) {
        if (!result) {
          return res
            .status(401)
            .send({ success: false, msg: "email or password incorrect." });
        } else {
          return res.status(200).send({
            success: true,
            data: {
              email: user.email,
              fullName: user.fullName,
              profilePicture: user.profilePicture,
              isActiveAccount: user.isActiveAccount,
              isDoctor: user.isDoctor,
            },
            accessToken: findbyEmail.generateAccessToken(),
            refreshToken: findbyEmail.generateRefreshToken(),
          });
        }
      }
    );
  } else {
    return res
      .status(401)
      .send({ success: false, msg: "email or password incorrect." });
  }
});

// @desc  create register
// @route   post /api/v1/auth/register
// @access  public
exports.postRegister = asyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName, dateOfBirth } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email: email });
  if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
    const data = {
      email: email,
      password: hashedPassword,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      dateOfBirth: dateOfBirth,
    };
    if (user === null) {
      const user = await User.create(data);
      return res.status(201).send({
        success: true,

        accessToken: user.generateAccessToken(),
        refreshToken: user.generateRefreshToken(),
      });
    } else {
      res
        .status(409)
        .send({ success: false, msg: "User exists already in the database." });
    }
  }
});

// @desc  refresh-token
// @route   post /api/v1/auth/refresh-token
// @access  public
exports.refreshAccessToken = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.body.refreshToken;
  if (!incomingRefreshToken) {
    next(new ErrorResponse("unauthorized request", 401));
  }
  const decodedInfo = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedInfo?._id);
  if (!user) {
    next(new ErrorResponse("Invalid refresh token", 401));
  }
  if (incomingRefreshToken !== user?.refreshToken) {
    next(new ErrorResponse("refresh token is required or used", 401));
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token refreshed"
      )
    );
});
