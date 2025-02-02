const jwt = require("jsonwebtoken");
const HttpError = require("../models/ErrorModel");

const authMiddleware = async (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;
  const token = Authorization.split(" ")[1];

  if (Authorization && Authorization.startsWith("Bearer")) {
    jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if (err) {
        return next(new HttpError("Unauthorized. Invalid token,", 403));
      }

      req.user = info;
      next();
    });
  } else {
    return next(new HttpError("Anauthorized. No token", 403));
  }
};
module.exports = authMiddleware;
