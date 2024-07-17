// create a publication schema for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  content: {
    type: String,
    required: [true, "Please add some content"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sicknessType: {
    type: String,
    required: [true, "Please add a sickness type"],
  },
  files: {
    type: [String],
    required: [true, "Please add a file link"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  modifiedBy: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
});
PublicationSchema.pre("save", async function (next) {
  const user = await this.model("User").findById(this.user);
  if (!user.isDoctor) {
    throw new Error("Only doctors can create publications");
  }
  next();
});

module.exports = mongoose.model("Publication", PublicationSchema);
