const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const userUtil = require("./user.util");
const User = require("./user.model");
const Auth = require("../auth/auth.model");
const UserService = require("./user.service");
const AuthService = require("../auth/auth.service");

const BadRequestError = require("../error/error.classes/BadRequestError");
const NotFoundError = require("../error/error.classes/NotFoundError");

//Create User
const CreateUser = async (req, res) => {
  const { password } = req.body;
  const user = new User(req.body);

  //validate Password
  if (!password) {
    throw new BadRequestError("Password is required");
  }
  // Construct auth object
  const auth = new Auth();
  auth._id = user.email;
  auth.password = await userUtil.getEncryptedPassword(password);
  auth.user = user;

  let createdUser = null;

  // Start mongoose default session to handle transactions
  const session = await startSession();
  try {
    session.startTransaction();
    createdUser = await UserService.save(user, session);
    await AuthService.save(auth, session);

    await session.commitTransaction();

    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
// Get all users
const GetAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAll();
    return res.status(StatusCodes.OK).json({
      users,
    });
  } catch (error) {
    throw new BadRequestError("Failed to fetch users");
  }
};

// Get user profile
const GetUserProfile = async (req, res) => {
  const auth = req.auth;

  // Get user profile
  const user = await UserService.findById(auth.id);

  // Check if user exists
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return res.status(StatusCodes.OK).json({
    user,
  });
};

// Delete user profile
const DeleteUserProfile = async (req, res) => {
  const auth = req.auth;
  

  // Get user profile
  const user = await UserService.findById(auth.id);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Start mongoose default session to handle transactions
  const session = await startSession();

  try {
    
    session.startTransaction();
    await UserService.findByIdAndDelete(auth.id, session);
    await AuthService.findByIdAndDelete(auth.email, session);
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }

  return res.status(StatusCodes.OK).json({
    message: "User deleted successfully",
  });
};

module.exports = { CreateUser, GetUserProfile, DeleteUserProfile, GetAllUsers };
