import React, { useState } from "react";
import axios from "../../util/axios"; 
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import LoginImage from "../../assets/login.png";

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
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const loginData = { email, password };

    try {
      const response = await axios.post("/auth/login", loginData);

      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setAuth({ token, user });

        toast.success("Login Successful!");

        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admindashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Incorrect email or password");
      toast.error("Incorrect email or password");
    }

    resetForm();
  };

  return (
    <div className="relative h-screen flex items-center justify-center px-4 sm:px-5 lg:px-0 overflow-hidden bg-transparent">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-4 sm:left-8 bg-blue-900 bg-opacity-70 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-600 hover:bg-blue-800 hover:bg-opacity-80 transition-all duration-300 text-xs sm:text-sm z-20 shadow-md"
      >
        ← Back to Home
      </button>

      {/* Animated Blobs */}
      <div className="absolute bottom-[-100px] left-[50%] translate-x-[-50%] w-80 h-80 sm:w-[500px] sm:h-[500px] bg-blue-600 rounded-full filter blur-3xl opacity-25 animate-blob3 z-0"></div>
      
      <motion.div
        className="w-full max-w-md sm:max-w-4xl bg-white border shadow-lg rounded-2xl flex flex-col md:flex-row justify-center flex-1 min-h-[480px] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hidden md:flex flex-1 bg-blue-100 items-center justify-center rounded-l-2xl"
          variants={imageVariants}
        >
          <div className="p-6">
            <img
              src={LoginImage}
              alt="login"
              width={"100%"}
              className="max-w-[400px] object-contain rounded-2xl"
              draggable={false}
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center relative"
          variants={formVariants}
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
              Sign In
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-3">
              Hey there! Sign in and start managing your system
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="mt-8 flex flex-col gap-4 w-full max-w-sm mx-auto"
          >
            <input
              className={`w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-gray-100 border ${
                errorMsg ? "border-red-400" : "border-gray-200"
              } placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-400 focus:bg-white`}
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                className={`w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-gray-100 border ${
                  errorMsg ? "border-red-400" : "border-gray-200"
                } placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-400 focus:bg-white pr-10`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-xs sm:text-sm text-center">{errorMsg}</div>
            )}

            <motion.button
              type="submit"
              className="mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>

            <p className="mt-4 text-xs sm:text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-900 font-semibold">
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
