/******************************************************************
 *  frontend/src/router/AppRouter.jsx
 ******************************************************************/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ——— Public pages ——— */
import Home from "../Pages/Home.jsx";
//import AboutUs from "../AboutUs.jsx";
import Contact from "../Pages/Contact.jsx";
import NotFound from "../Pages/NotFound.jsx";
import RegisterPage from "../Pages/Register.jsx";
import LoginPage from "../Pages/Login.jsx";
import LostAndFoundForm from "../Pages/Form.jsx";
import AboutPage from "../Pages/About.jsx";
import Terms from "../Components/Terms.jsx";
import PrivacyPolicy from "../Components/PrivacyPolicy.jsx";
import Profile from "../Pages/Profile.jsx";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public ---------------------------------------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<LostAndFoundForm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />

        {/* ❌ 404 ------------------------------------------------------ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
