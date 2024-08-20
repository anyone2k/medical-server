const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  report: {
    type: String,
    required: [true, "Please add some content"],
  },
  sicknessType: {
    type: String,
    required: [true, "Please add a sickness type"],
  },
  files: {
    type: [String],
    required: [true, "Please add a file link"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  modifiedBy: [
    {
      doctor: {
        type: Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Publication", PublicationSchema);
