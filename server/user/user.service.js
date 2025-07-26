const User = require("./user.model");

const save = async (user, session) => {
  return await user.save({ session });
};

const findById = async (id, session) => {
  if (session) {
    return await User.findById(id).session(session);
  } else {
    return await User.findById(id);
  }
};

const findAll = async (queryObj) => {
  return await User.find(queryObj).sort({ createdAt: -1 });
};

const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await User.findByIdAndDelete(id).session(session);
  } else {
    return await User.findByIdAndDelete(id);
  }
};
module.exports = {
  save,
  findById,
  findAll,
  findByIdAndDelete,
};
