import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock,Shield,Users,ArrowRight,Zap,BarChart3,} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import Navbar from "../pages/Navbar";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black pt-24">
        {/* Background Layers */}
        <img
          src="/background.jpeg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm z-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] z-10" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 text-blue-400/20 text-2xl font-mono animate-pulse z-20">⏰</div>
        <div className="absolute top-40 right-32 text-purple-400/20 text-xl font-mono animate-bounce z-20">👥</div>
        <div className="absolute bottom-32 left-40 text-cyan-400/20 text-lg font-mono animate-ping z-20">TRACK</div>

        {/* Main Content */}
        <div
          className={`relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center px-6 py-3 mt-8 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-gray-700/50 text-gray-100 text-sm font-medium mb-8 shadow-2xl group hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
            <Clock className="w-4 h-4 mr-2 text-blue-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="relative">The Future of Attendance Management</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            Smart Attendance Tracking.{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Seamless Management.
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-2xl -z-10" />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            TrackZen is the comprehensive platform designed to streamline your workforce management with{" "}
            <span className="text-gray-100 font-medium">
              real-time tracking, secure authentication, and intelligent reporting.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link to="/admin-login">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border-0"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Shield className="mr-2 w-5 h-5" />
                  Admin Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Link to="/employee-login">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border-0"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Users className="mr-2 w-5 h-5" />
                  Employee Portal
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-24"
          >
            <div className="flex flex-col items-center p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-700/50 hover:bg-black/60 hover:border-gray-600/50 transition-all duration-300">
              <Zap className="w-8 h-8 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-gray-100">99.9%</div>
              <div className="text-gray-400 text-sm">Accuracy Rate</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-700/50 hover:bg-black/60 hover:border-gray-600/50 transition-all duration-300">
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-gray-100">100%</div>
              <div className="text-gray-400 text-sm">Secure Access</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-gray-700/50 hover:bg-black/60 hover:border-gray-600/50 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-gray-100">24/7</div>
              <div className="text-gray-400 text-sm">Real-time Tracking</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Animations */}
        <motion.div
          className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full opacity-30 blur-2xl z-10"
          initial={{ x: "-10%", y: "100%" }}
          animate={{ x: "110%", y: "-20%" }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-6 h-6 bg-blue-400 rounded-full opacity-20 z-10"
          initial={{ x: "90%", y: "10%" }}
          animate={{ x: "10%", y: "90%" }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </section>
    </>
  );
};

export default LandingPage;
