const User = require("../app/models/User");
const { verify } = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(payload.userId);

  if (!user) return next(createError(403, "User does not exist'"));
  req.user = user;
  return next();
};

const verifyAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
