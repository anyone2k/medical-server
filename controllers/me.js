// Internal Imports
const Users = require("../Models/User");
const asyncHandler = require("../middleware/async");
// @desc  read me
// @route   GET /me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await Users.findOne({ _id: req.id });
  return res.status(200).send(user);
});

// @desc  update me
// @route   PUT /me
// @access  Private
exports.putMe = (req, res, next) => {
  const { username, email } = req.body;
  if (Users.findByEmail(email) !== null) {
    return res.status(409).send("Email is used by another User!");
  }
  const user = Users.findById(req._id);
  data = {
    username: username,
    email: email,
    password: user.password,
    isAdmin: false,
    score: user.score,
  };
  const mod = Users.updateById(req._id, data);

  return res.status(200).send("User Modified");
};
// @desc  Delete me
// @route   DELETE /me
// @access  Private
exports.deleteMe = (req, res, next) => {
  Users.deleteById(req._id);
  res.status(204).send();
};
