// External imports
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please provide an email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      require: [true, "Please provide a password"],
      select: false,
      minlength: 6,
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
      default: "no-photo.jpg",
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.generateTokens = function () {
  return {
    accessToken: jwt.sign(
      {
        _id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    ),
    refreshToken: jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    ),
  };
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("MedicalUsers", UserSchema);
