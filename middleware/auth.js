// External imports
const jwt = require("jsonwebtoken");

// Internal imports
const Staff = require("../Models/Staff");

const Patient = require("../Models/Patient");

const Doctor = require("../Models/Doctor");
const asyncHandler = require("./async");

exports.protect = (user_type) => {
  return async (req, res, next) => {
    let user;
    try {
      let token = req.headers.authorization;

      if (token === undefined) {
        return res
          .status(401)
          .send("Not authorized to access this route / Invalid Token");
      }

      if (!token.startsWith("Bearer")) {
        return res
          .status(401)
          .send("Not authorized to access this route / Invalid Token");
      }

      token = token.split(" ")[1];
      const tokenDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (user_type === "staff") {
        user = await Staff.findOne({ _id: tokenDecoded._id });
      } else if (user_type === "patient") {
        user = await Patient.findOne({ _id: tokenDecoded._id });
      } else {
        user = await Doctor.findOne({ _id: tokenDecoded._id });
      }

      if (!user) {
        return res
          .status(401)
          .send("Not authorized to access this route / Invalid Token");
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send("Not authorized to access this route / Invalid Token");
    }
  };
};

exports.isDoctor = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res
      .status(401)
      .send("Not authorized to access this route / Invalid Token");
  }
  next();
});

// create an authorize function to check if the user is authorized to access a route
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .send("Not authorized to access this route / Invalid Token");
    }
    next();
  };
};
