const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: [true, "Please add a first name"],
      },
      lastName: {
        type: String,
        required: [true, "Please add a last name"],
      },
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
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    phone_number: {
      type: String,
      required: [true, "Please provide a phone number :"],
    },
    medicalfile: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalFile",
        required: true,
      },
    ],
    emergency_contact: {
      type: String,
      required: [true, "Please provide a emergency contact :"],
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

// Check if the model already exists before defining it
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

// Ensure the unique index is created
PatientSchema.on("index", (error) => {
  if (error) {
    console.error("An error occurred while creating the index:", error);
  }
});

module.exports = Patient;
