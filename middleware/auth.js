// Internal imports
const Staff = require("../Models/Staff");

const Doctor = require("../Models/Doctor");
const asyncHandler = require("./async");
const { decodeToken } = require("../utils/userFunctions");

exports.staffProtect = async (req, res, next) => {
  const tokenDecoded = decodeToken(req, res);
  try {
    const user = await Staff.findOne({ _id: tokenDecoded._id });
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
exports.protect = async (req, res, next) => {
  let user;
  const tokenDecoded = decodeToken(req, res);

  try {
    user = await Staff.findOne({ _id: tokenDecoded._id });
    user = await Patient.findOne({ _id: tokenDecoded._id });
    user = await Doctor.findOne({ _id: tokenDecoded._id });

    if (!user) {
      return res
        .status(401)
        .send("Not authorized to access this route / Invalid Token");
    }
    req.user = user;
    constole.log("User", user);
    next();
  } catch (error) {
    return res
      .status(401)
      .send("Not authorized to access this route / Invalid Token");
  }
  next();
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
