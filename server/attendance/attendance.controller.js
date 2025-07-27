const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const Attendance = require("../attendance/attendance.model");
const AttendanceService = require("../attendance/attendance.service");
const NotFoundError = require("../error/error.classes/NotFoundError");

// Mark check-in
const MarkCheckIn = async (req, res, next) => {
  const { id: employeeId } = req.auth;
  const session = await startSession();

  try {
    session.startTransaction();

    const today = new Date().toISOString().slice(0, 10);
    const existing = await Attendance.findOne({ employeeId, date: today });

    if (existing) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Already checked in today" });
    }

    const attendance = new Attendance({
      employeeId,
      date: today,
      checkIn: new Date(),
    });

    const saved = await AttendanceService.save(attendance, session);
    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({
      message: "Check-in recorded",
      attendance: saved,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// Mark check-out
const MarkCheckOut = async (req, res, next) => {
  const { id: employeeId } = req.auth;

  try {
    const today = new Date().toISOString().slice(0, 10);
    const attendance = await Attendance.findOne({ employeeId, date: today });

    if (!attendance) {
      throw new NotFoundError("Check-in not found for today");
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.status(StatusCodes.OK).json({
      message: "Check-out recorded",
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// View logs for employee
const GetMyAttendanceLogs = async (req, res, next) => {
  if (!req.auth || !req.auth.id) {
    return res.status(401).json({ message: "Unauthorized: Missing auth info" });
  }

  const employeeId = req.auth.id;
  
  try {
    const logs = await AttendanceService.findAll({ employeeId });
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};


// Admin: view all
const GetAllAttendanceRecords = async (req, res, next) => {
  try {
    const records = await AttendanceService.findAll();
    res.status(StatusCodes.OK).json(records);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  MarkCheckIn,
  MarkCheckOut,
  GetMyAttendanceLogs,
  GetAllAttendanceRecords,
};
