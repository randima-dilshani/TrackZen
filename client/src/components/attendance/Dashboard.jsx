import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, LogOut, History, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../util/axios";

// ✅ Import Toast
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300 },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, ease: "easeOut" },
  }),
};

const cardHeaderVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const EmployeePortal = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState("00:00:00");
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const fetchAttendanceLogs = async () => {
    try {
      const res = await axiosInstance.get("/attendance/mylogs");
      setAttendanceHistory(res.data);

      const today = new Date().toISOString().split("T")[0];

      const todayLog = res.data.find((log) => {
        const logDate = new Date(log.date).toISOString().split("T")[0];
        return logDate === today;
      });

      if (todayLog) {
        setCheckInTime(todayLog.checkIn ? new Date(todayLog.checkIn) : null);
        setCheckOutTime(todayLog.checkOut ? new Date(todayLog.checkOut) : null);
        setIsCheckedIn(todayLog.checkIn && !todayLog.checkOut);

        if (todayLog.checkIn && todayLog.checkOut) {
          const diff = new Date(todayLog.checkOut) - new Date(todayLog.checkIn);
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setWorkingHours(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        }
      } else {
        setCheckInTime(null);
        setCheckOutTime(null);
        setWorkingHours("00:00:00");
        setIsCheckedIn(false);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err.response?.data || err.message);
    }
  };

  const handleCheckIn = async () => {
    try {
      const res = await axiosInstance.post("/attendance/checkin");
      setIsCheckedIn(true);
      setCheckInTime(new Date(res.data.checkIn));
      toast.success("Checked in successfully!");
      fetchAttendanceLogs();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      if (errorMessage.toLowerCase().includes("already checked in")) {
        toast.error("You have already checked in today.");
      } else {
        console.error("Check-in error:", errorMessage);
        toast.error("Failed to check in.");
      }
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axiosInstance.post("/attendance/checkout");
      setIsCheckedIn(false);
      setCheckOutTime(new Date(res.data.checkOut));
      setCheckInTime(null);
      toast.success("Checked out successfully!");
      fetchAttendanceLogs();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      if (errorMessage.toLowerCase().includes("already checked out")) {
        toast.error("You have already checked out today.");
      } else {
        console.error("Check-out error:", errorMessage);
        toast.error("Failed to check out.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
    navigate("/login");
  };

  useEffect(() => {
    fetchAttendanceLogs();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (checkInTime) {
        const diff = new Date().getTime() - new Date(checkInTime).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setWorkingHours(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [checkInTime]);

  const employee = {
    name: auth?.user?.employeeName || "User",
    email: auth?.user?.email || "-",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />

      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-gray-700/50 shadow-lg">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 h-[80px]">
          <div className="flex items-center space-x-3">
           <img src="/logo.jpg" alt="TrackZen Logo" className="h-8 w-8" />
  <span className="text-xl font-bold text-white tracking-wide">TrackZen</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {employee.name}</span>
            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent flex items-center justify-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Employee Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-black/40 backdrop-blur-xl border-gray-700/50">
            <CardContent className="p-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
                <p className="text-gray-400">Email: {employee.email}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attendance Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-gray-700/50 h-full">
              <CardHeader>
                <motion.div
                  variants={cardHeaderVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CardTitle className="flex items-center text-white">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" /> Attendance
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {currentTime.toLocaleTimeString()}
                  </div>
                  <div className="text-gray-400">
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="text-center">
                  {!isCheckedIn ? (
                    <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }} className="flex justify-center">
                      <Button
                        onClick={handleCheckIn}
                        className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg flex items-center justify-center"
                      >
                        <CheckCircle className="mr-2 w-5 h-5" />
                        <span>Check In</span>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }} className="flex justify-center">
                      <Button
                        onClick={handleCheckOut}
                        className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg flex items-center justify-center"
                      >
                        <XCircle className="mr-2 w-5 h-5" />
                        <span>Check Out</span>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-gray-700/50 h-full">
              <CardHeader>
                <motion.div
                  variants={cardHeaderVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CardTitle className="flex items-center text-white">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" /> Today's
                    Summary
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">
                      {checkInTime ? checkInTime.toLocaleTimeString() : "--:--"}
                    </div>
                    <div className="text-gray-400 text-sm">Check In</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">
                      {checkOutTime ? checkOutTime.toLocaleTimeString() : "--:--"}
                    </div>
                    <div className="text-gray-400 text-sm">Check Out</div>
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">{workingHours}</div>
                  <div className="text-gray-400 text-sm">Total Hours</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attendance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-black/40 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <motion.div
                variants={cardHeaderVariants}
                initial="hidden"
                animate="visible"
              >
                <CardTitle className="flex items-center text-white">
                  <History className="w-5 h-5 mr-2 text-blue-400" /> Recent
                  Attendance History
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400">Check In</th>
                      <th className="text-left py-3 px-4 text-gray-400">Check Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 px-4 text-center text-gray-400"
                        >
                          No records found.
                        </td>
                      </tr>
                    )}
                    {attendanceHistory.map((log, i) => (
                      <motion.tr
                        key={log._id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={tableRowVariants}
                        className="border-b border-gray-800 hover:bg-gray-800/30"
                      >
                        <td className="py-3 px-4 text-white">
                          {new Date(log.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {log.checkIn
                            ? new Date(log.checkIn).toLocaleTimeString()
                            : "--:--"}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {log.checkOut
                            ? new Date(log.checkOut).toLocaleTimeString()
                            : "--:--"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmployeePortal;
