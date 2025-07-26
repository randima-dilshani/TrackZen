const express = require("express");
const attendanceController = require("../attendance/attendance.controller");
const authMiddleware = require("../auth/auth.middleware");
const constants = require("../utill/constants");

const AttendanceRouter = express.Router();

// Check-in
AttendanceRouter.post(
  "/checkin",
  authMiddleware.authorize([constants.USER.ROLES.USER, constants.USER.ROLES.ADMIN]),
  attendanceController.MarkCheckIn
);

// Check-out
AttendanceRouter.post(
  "/checkout",
  authMiddleware.authorize([constants.USER.ROLES.USER, constants.USER.ROLES.ADMIN]),
  attendanceController.MarkCheckOut
);

// Employee: View own logs
AttendanceRouter.get(
  "/mylogs",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  attendanceController.GetMyAttendanceLogs
);

// Admin: View all attendance records
AttendanceRouter.get(
  "/all",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  attendanceController.GetAllAttendanceRecords
);

module.exports = AttendanceRouter;
