import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "antd/dist/reset.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster duration={2500} richColors closeButton position="top-right" />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
