const jwt = require("jsonwebtoken");
const createError = require("./error.js");

// verify token
const verifyToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SK);

      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
      next();
    } catch (error) {
      next(createError(403, "invalid token"));
    }
  } else {
    return next(createError(401, "You are not authenticated"));
  }
};

// verify user
const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized"));
  }
};

// verify admin
const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized"));
  }
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
