// create a publication schema for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// i want you to recreate the schema and add the author field and the modiefied by field that has a list of people who applied a modification

const PublicationSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // files field
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
// i want the publication to be created by a user that has the isDoctorfield set to true
PublicationSchema.pre("save", async function (next) {
  const user = await this.model("User").findById(this.user);
  if (!user.isDoctor) {
    throw new Error("Only doctors can create publications");
  }
  next();
});
