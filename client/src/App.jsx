import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import LandingPage from "./pages/Landingpage";
import Signup from "./components/User/Signup";
import Dashboard from "./components/attendance/Dashboard";
import AdminDashboard from "./components/User/AdminDashboard";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      
    </Routes>
  );
}

export default App;
