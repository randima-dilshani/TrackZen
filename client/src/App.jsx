import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import LandingPage from "./pages/Landingpage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
