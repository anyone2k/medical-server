// // External imports
const Publication = require("../Models/Publication");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../Models/User");

// // @desc  get all publications
// // @route   get /api/v1/publications
// // @access  public
exports.getPublications = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});

// @desc  get single publication
// @route   get /api/v1/publications/:id
// @access  public
exports.getPublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findById(req.params.id);
  if (publication === null) {
    return next(
      new ErrorResponse(
        `Publication not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).send(publication);
});

// @desc  create publication
// @route   post /api/v1/publications/:id (user id)
// @access  private
exports.createPublication = asyncHandler(async (req, res, next) => {
  if (!req.params.id || !(await User.findById(req.params.id)))
    return next(new ErrorResponse("User not found", 404));
  delete req.body.user;
  const publication = await Publication.create({
    ...req.body,
    user: req.params.id,
  });
  res.status(201).send(publication);
});

// @desc  update publication
// @route   put /api/v1/publications/:id
// @access  private
exports.updatePublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!publication) {
    return next(
      new ErrorResponse(
        `Publication not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).send(publication);
});

// @desc  delete publication
// @route   delete /api/v1/publications/:id
// @access  private
exports.deletePublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findByIdAndDelete(req.params.id);
  if (!publication) {
    return next(
      new ErrorResponse(
        `Publication not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(204).send();
});
