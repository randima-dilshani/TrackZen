const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Employee ID is required!"],
    },
    date: {
      type: Date,
      required: [true, "Date is required!"],
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
