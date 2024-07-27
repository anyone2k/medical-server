// Internal Imports
const Users = require("../Models/User");
const asyncHandler = require("../middleware/async");
// @desc  read me
// @route   GET /me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// @desc  update me
// @route   PUT /me
// @access  Private
// exports.putMe = (req, res, next) => {
//   const { username, email } = req.body;
//   if (Users.findByEmail(email) !== null) {
//     return res.status(409).send("Email is used by another User!");
//   }
//   const user = Users.findById(req._id);
//   data = {
//     username: username,
//     email: email,
//     password: user.password,
//     isAdmin: false,
//     score: user.score,
//   };
//   const mod = Users.updateById(req._id, data);

//   return res.status(200).send("User Modified");
// };
exports.putMe = asyncHandler(async (req, res, next) => {
  const filter = {};
  if (req.body.email) filter.email = req.body.email;
  if (req.body.fullName) {
    if (req.body.firstName) filter.firstName = req.body.firstName;
    else filter.fullName.firstName = req.user.firstName;
    if (req.body.lastName) filter.lastName = req.body.lastName;
    else filter.lastName = req.user.lastName;
  }
  if (req.body.dateOfBirth) filter.dateOfBirth = req.body.dateOfBirth;
  if (req.body.profilePicture) filter.profilePicture = req.body.profilePicture;

  // Ajoutez l'option { new: true } pour obtenir le document mis à jour
  const updatedUser = await Users.findByIdAndUpdate(req.user._id, filter, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// @desc  Delete me
// @route   DELETE /me
// @access  Private
exports.deleteMe = async (req, res, next) => {
  await Users.findByIdAndDelete(req.user._id);
  res.status(200).send({
    success: true,
    data: {},
  });
};
