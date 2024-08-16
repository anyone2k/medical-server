// the doctor model is going to be the following:
// External imports
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// Schema
const DoctorSchema = new mongoose.Schema({
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
    required: [true, "Please add an email"],
    unique: true,
    validate: [validator.isEmail, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  specialisation: {
    type: {
      name: {
        type: String,
        enum: ["dentist", "surgeon", "general"],
        default: "doctor",
      },
      field: {
        type: String,
        enum: [
          "cardiology",
          "dermatology",
          "endocrinology",
          "gastroenterology",
          "general practice",
          "hematology",
          "infectious disease",
          "nephrology",
          "neurology",
          "obstetrics and gynecology",
          "oncology",
          "ophthalmology",
          "orthopedics",
          "otolaryngology",
          "pediatrics",
          "psychiatry",
          "pulmonology",
          "radiology",
          "rheumatology",
          "surgery",
          "urology",
          "odontology",
          "orthodontics",
          "periodontics",
          "endodontics",
        ],
        required: true,
      },
    },
    default: {
      name: "doctor",
      field: "general",
    },
  },
  profilePicture: {
    type: String,
    default:
      "https://drive.google.com/file/d/1EyXbZPP-qX9UHmrdpn61uLfTkbChzVcF/view?usp=drive_link",
  },
  hostpital: {
    type: mongoose.Schema.ObjectId,
    ref: "Hospital",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
StaffSchema.methods.generateTokens = function () {
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

// Match user entered password to hashed password in database
DoctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model
module.exports = mongoose.model("Doctor", DoctorSchema);
