import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-black/80 border-b border-gray-700/50"
          : "bg-white/10 border-b border-white/10"
      } shadow-lg`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 h-[80px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="text-white font-bold text-xl sm:text-2xl">
            TrackZen
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-base tracking-wider text-white font-medium">
          <Link to="#about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link to="#features" className="hover:text-blue-400 transition">
            Features
          </Link>
          <Link to="#pricing" className="hover:text-blue-400 transition">
            Pricing
          </Link>
          <Link to="#contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-500">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
