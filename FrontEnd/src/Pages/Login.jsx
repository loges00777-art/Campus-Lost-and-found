// ✅ Correct imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faEnvelope,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

// ✅ Import your initialized Firebase Auth
import { auth } from "../firebase/firebaseConfig";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = formData;

  try {
    // 1. Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // 2. Send token to backend
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      idToken,
    });

    const { user, msg } = response.data;

    // 3. Show success message
    await Swal.fire({
      icon: "success",
      title: `Welcome, ${user.firstName}!`,
      text: msg || "Login successful.",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/");

  } catch (err) {
    console.error("Login error:", err);

    let message = "Login failed. Please try again.";

    // Firebase Auth errors
    if (err.code === "auth/user-not-found") {
      message = "No account found with this email.";
    } else if (err.code === "auth/wrong-password") {
      message = "Incorrect password.";
    } 
    // Backend validation errors
    else if (err.response?.data?.msg) {
      message = err.response.data.msg;
    }

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: message,
    });
  }
};


  const backgroundImages = [
    "https://tse1.mm.bing.net/th/id/OIP.444ppBSrE8kTbsNxAymNbQHaE2?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://cdn.pixabay.com/photo/2021/08/11/02/31/university-6537167_1280.jpg",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
  ];
  const randomBackground =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(139, 92, 246, 0.3)), url('${randomBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
              <FontAwesomeIcon
                icon={faUniversity}
                className="text-white text-2xl"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-white">CampusLost</h1>
              <p className="text-purple-200 text-sm">Student Portal</p>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-purple-200">Sign in to continue your journey</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-purple-300"
              />
              University Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              placeholder="student@university.edu"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FontAwesomeIcon icon={faLock} className="mr-2 text-purple-300" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-white text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-purple-300 hover:text-white font-medium cursor-pointer underline transition-colors"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white font-bold text-sm">2.8K+</div>
            <div className="text-purple-200 text-xs">Students</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white font-bold text-sm">1.2K+</div>
            <div className="text-purple-200 text-xs">Items Found</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white font-bold text-sm">89%</div>
            <div className="text-purple-200 text-xs">Success Rate</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-xs">
            &copy; 2025 CampusLost • Reuniting students with their belongings
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
