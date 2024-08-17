const { token } = require("morgan");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
exports.loginFunction = async (user, req, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    // Check if email and password are provided
    return next(new ErrorResponse("Please provide an email and password", 400));

  // Check if user exists
  const result = await user
    .findOne({ email: req.body.email })
    .select("+password");

  // Check if user exists
  if (!result) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password is correct
  if (!(await result.matchPassword(req.body.password))) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Generate tokens
  const { accessToken, refreshToken } = await result.generateTokens();

  // Return a json response
  return {
    success: true,
    accessToken,
    refreshToken,
  };
};
exports.registerFunction = async (user, req, next) => {
  const result = await user.create(req.body);

  // Generate tokens
  const { accessToken, refreshToken } = await result.generateTokens();

  // Return a json response
  return {
    success: true,
    accessToken,
    refreshToken,
  };
};
exports.refreshTokenFunction = async (user, req) => {
  if (!req.headers.refreshtoken) {
    return next(new ErrorResponse("unauthorized request", 401));
  }
  const decoded = jwt.verify(
    req.headers.refreshtoken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const result = await user.findById(decoded._id);
  if (!result) {
    return next(new ErrorResponse("Invalid refresh token", 401));
  }

  return {
    success: true,
    ...result.generateTokens(),
  };
};
exports.getRessources = async (model) => {
  const result = await model.find();
  return {
    success: true,
    data: result,
  };
};
exports.getRessourceById = async (model, req) => {
  const result = await model.findById(req.params.id);
  if (!result) {
    throw new ErrorResponse(
      `Resource not found with id of ${req.params.id}`,
      404
    );
  }
  return {
    success: true,
    data: result,
  };
};

exports.createRessource = async (model, req, next) => {
  const result = await model.create(req.body);

  return {
    success: true,
    data: result,
  };
};

exports.updateById = async (model, req, next) => {
  const result = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  return {
    success: true,
    data: result,
  };
};

exports.deleteById = async (model, req, next) => {
  const result = await model.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });

  if (!result) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  return {
    success: true,
    data: {},
  };
};

exports.decodeToken = (req, res) => {
  let token = req.headers.authorization;

  if (token === undefined) {
    return res
      .status(401)
      .send("Not authorized to access this route / Invalid Token");
  }

  if (!token.startsWith("Bearer")) {
    return res
      .status(401)
      .send("Not authorized to access this route / Invalid Token");
  }

  token = token.split(" ")[1];
  const tokenDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return tokenDecoded;
};
