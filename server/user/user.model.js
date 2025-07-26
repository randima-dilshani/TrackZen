const mongoose = require("mongoose");
const constants = require("../utill/constants");

const UserSchema = new mongoose.Schema(
    {
        employeeName: {
          type: String,
          maxlength: [100, "Employee Name should not exceed 50 characters!"],
          required: [true, "Employee Name is required!"],
        },
        email: {
          type: String,
          unique: true,
          maxlength: [50, "Email should not exceed 50 characters!"],
          required: [true, "Email is required!"],
          validate: {
            validator: (value) => {
              return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              );
            },
            message: "Invalid email address!",
          },
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: {
              values: [constants.USER.ROLES.ADMIN, constants.USER.ROLES.USER],
              message: "Valid roles required",
            },
          },
          phoneNumber: {
            type: String,
            unique: true,
            maxlength: [10, "Phone number should not exceed 10 characters!"],
            required: [true, "Phone number is required!"],
            validate: {
              validator: (value) => {
                return /^\d{10}$/.test(value);
              },
              message: "Invalid phone number! It should be exactly 10 digits.",
            },
          },
          NIC: {
            type: String,
            required: [true, "Employee NIC is required!"],
          },
      },
      {
        versionKey: false,
        timestamps: true,
      }
);

module.exports = mongoose.model("User", UserSchema);