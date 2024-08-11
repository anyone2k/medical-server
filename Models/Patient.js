const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
      minlength: 6,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { timestamps: true }
);

PatientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

PatientSchema.methods.generateTokens = function () {
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

PatientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const patientSchema = mongoose.model("Patients", PatientSchema);

// Ensure the unique index is created
PatientSchema.on("index", (error) => {
  if (error) {
    console.error("An error occurred while creating the index:", error);
  }
});

module.exports = patientSchema;
