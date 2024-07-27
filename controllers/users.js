// External imports
const asyncHandler = require("../middleware/async");

/// @desc get all users
// @route get /api/v1/users
// @access private
exports.getUsers = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});
