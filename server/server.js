const express = require("express");
const cors = require("cors");
const path = require("path");
require("express-async-errors");

const databaseConfig = require("./config/database.config");
const errorHandlerMiddleware = require("./error/error.middleware");
const NotFoundError = require("./error/error.classes/NotFoundError");

const constants = require("./utill/constants");
require("dotenv").config();

const app = express();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

//import routes
const AuthRouter = require("./auth/auth.route");
const UserRouter = require("./user/user.route");
// const CourseRouter = require("./courses/course.route");
// const EnrollmentRouter = require("./enrollment/enrollment.route");

//defines routes
app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
app.use(constants.API.PREFIX.concat("/user"), UserRouter);
// app.use(constants.API.PREFIX.concat("/course"), CourseRouter);
// app.use(constants.API.PREFIX.concat("/enrollments"), EnrollmentRouter);

//error handler middleware
app.use(errorHandlerMiddleware);

//404 not found route
app.use((req, res, next) => {
    throw new NotFoundError("API endpoint not found!");
  });


  const start = async () => {
    const port = process.env.PORT || 8081;
    try {
      await databaseConfig.connectDB();
      app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  start();
  