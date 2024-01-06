import React from "react";
import {  Route, Routes } from "react-router-dom";    // Import the FileUpload Component
import PageNotFound from "./pages/User/PageNotFound";
import PrinterAnimation from "./pages/User/PrinterAnimation";
import "./App.css";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { ThemeProvider } from "./pages/ThemeContext";
import Dashboard from "./pages/Operator/Dashboard";
import UploadPage from "./pages/User/UploadPage";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SetPreferencesPage from "./pages/User/SetPreferences";

function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        {/* <Route path="/xopy.tech" element={<LandingPage />} /> */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/setpreferences" element={<SetPreferencesPage />} />
        <Route path="/printstatus" element={<PrinterAnimation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
