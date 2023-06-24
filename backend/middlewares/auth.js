const User = require("../models/userModel");
const { createError } = require("../utils/createError");
const jwt = require("jsonwebtoken");

exports.verifyUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(createError("Unauthorized please login first!", 401));

  await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err)
      return next(createError("Token is Invalid or has been Expired!", 401));
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  });
};

exports.verifyAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return next(
      createError("You don't have permission to access this resource!", 401)
    );
  }
};
