const express = require("express");
const userController = require("../user/user.controller");
const authMiddleware = require("../auth/auth.middleware");

const UserRouter = express.Router();

UserRouter.post("/register", userController.CreateUser);

UserRouter.get(
  "/profile",
  authMiddleware.authorize(),
  userController.GetUserProfile
);
// Get all users
UserRouter.get("/getallusers", userController.GetAllUsers);

UserRouter.delete( "/deleteProfile", authMiddleware.authorize(),
  userController.DeleteUserProfile
);

module.exports = UserRouter;
