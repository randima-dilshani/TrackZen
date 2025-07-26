const jwt = require("jsonwebtoken");
const authUtil = require("./auth.utill");
const UnauthorizedError = require("../error/error.classes/UnauthorizedError");
require("dotenv").config();

const authorize = (roleArr) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication invalid!");
    }

    const token = authUtil.extractToken(authHeader);
    if (token) {
      let payload = null;

      // Verify token
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (err) {
        if (err.name === "TokenExpiredError")
          throw new UnauthorizedError("Your session is expired!");
        return next(
          new UnauthorizedError(`You're unauthorized to access this resource!`)
        );
      }

      // Check if user has the required role
      if(roleArr.length > 0){
        if(!roleArr.includes(payload.role)){
          return next(
            new UnauthorizedError(`You're unauthorized to access this resource!`)
          );
        }
      }

      // Add auth object to req.body
      req.auth = payload;
      return next();
    } else {
      return next(
        new UnauthorizedError(`You're unauthorized to access this resource!`)
      );
    }
  };
};

module.exports = { authorize };
