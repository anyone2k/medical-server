const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      default: null,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      default: null,
    },
    phone_number: {
      type: String,
      default: "",
    },
    medicalfile: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalFile",
        default: null,
      },
    ],
    emergency_contact: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "no-photo.jpg",
    },
    isActive: {
      type: Boolean,
      default: true,
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
