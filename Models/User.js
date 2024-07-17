// External imports
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please provide a password"],
    },
    fullname: {
      firstName: String,
      lastName: String,
    },
    dateOfBirth: {
      type: Date,
      require: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isActiveAccount: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

module.exports = mongoose.model("MedicalUsers", UserSchema);
