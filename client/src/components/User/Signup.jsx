import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../util/axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import SignUpImage from "../../assets/a2.png";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
};

const SignUp = () => {
  const navigate = useNavigate();

  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [NIC, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = () => {
    setEmployeeName("");
    setEmail("");
    setPhoneNumber("");
    setNIC("");
    setPassword("");
    setConfirmPassword("");
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const user = {
      employeeName,
      email,
      phoneNumber,
      NIC,
      password,
      role: "user",
    };

    try {
      const response = await api.post("/user/register", user);
      if (response?.data) {
        toast.success("Registration Successful!");
        resetForm();
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
   <div className="relative h-screen flex items-center justify-center px-4 sm:px-5 lg:px-0 overflow-hidden">
  <button
  onClick={() => navigate("/")}
  className="absolute top-6 left-4 sm:left-8 bg-blue-900 bg-opacity-70 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-600 hover:bg-blue-800 hover:bg-opacity-80 transition-all duration-300 text-xs sm:text-sm z-20 shadow-md"
>
  ← Back to Home
</button>
      {/* Animated Blobs */}
      <div className="absolute bottom-[-100px] left-[50%] translate-x-[-50%] w-80 h-80 sm:w-[500px] sm:h-[500px] bg-blue-600 rounded-full filter blur-3xl opacity-25 animate-blob3 z-0"></div>

      <motion.div
        className="w-full max-w-md sm:max-w-5xl bg-white border shadow-lg rounded-2xl flex flex-col md:flex-row justify-center flex-1 min-h-[540px] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side Image */}
        <motion.div
          className="hidden md:flex flex-1 bg-blue-100 items-center justify-center rounded-l-2xl"
          variants={imageVariants}
        >
          <div className="p-6">
            <img
              src={SignUpImage}
              alt="signup"
              className="max-w-[400px] w-full object-contain rounded-2xl"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-center"
          variants={formVariants}
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900">Sign Up</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-3">
              Hey! Enter your details to create your account
            </p>
          </div>

          <form onSubmit={sendData} className="mt-8 flex flex-col gap-4 w-full max-w-sm mx-auto">
            <input
              className="input-style"
              type="text"
              placeholder="Enter your name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
            <input
              className="input-style"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-style"
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              className="input-style"
              type="text"
              placeholder="Enter your NIC"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="input-style"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="input-style"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
            <p className="mt-4 text-xs sm:text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-900 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>

      {/* Blobs Animation */}
      <style>
        {`
          @keyframes blob1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(30px, 20px) scale(1.1); }
          }
          @keyframes blob3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(40px, -20px) scale(1.15); }
          }
          .animate-blob1 { animation: blob1 7s infinite ease-in-out; }
          .animate-blob3 { animation: blob3 6s infinite ease-in-out; }
        `}
      </style>

      {/* Optional: Tailwind shortcut for inputs */}
      <style>
        {`
          .input-style {
            width: 100%;
            padding: 0.75rem 1.25rem;
            border-radius: 0.5rem;
            background-color: #f3f4f6;
            border: 1px solid #e5e7eb;
            font-size: 0.875rem;
            color: #374151;
            outline: none;
          }
          .input-style:focus {
            background-color: white;
            border-color: #9ca3af;
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
