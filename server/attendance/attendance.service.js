const Attendance = require("../attendance/attendance.model");

const save = async (attendance, session) => {
  return await attendance.save({ session });
};

const findAll = async (queryObj = {}) => {
  return await Attendance.find(queryObj)
    .populate("employeeId", "email employeeName")  
    .sort({ createdAt: -1 });
};


const findById = async (id) => {
  return await Attendance.findById(id).populate("employeeId", "email");
};

const findByIdAndUpdate = async (id, update, session) => {
  if (session) {
    return await Attendance.findByIdAndUpdate(id, update, { new: true }).session(session);
  } else {
    return await Attendance.findByIdAndUpdate(id, update, { new: true });
  }
};

const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Attendance.findByIdAndDelete(id).session(session);
  } else {
    return await Attendance.findByIdAndDelete(id);
  }
};

module.exports = {
  save,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
