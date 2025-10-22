// src/Register.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  IdCard,
  Building,
  GraduationCap,
  Shield,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    campusId: "",
    department: "",
    year: "",
    userType: "student",
  });

  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images array
  const backgroundImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
  ];

  // Rotate background images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Modern color palette - Deep Blue & Emerald
  const colors = {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    accent: {
      50: '#fef7ff',
      100: '#fce7ff',
      500: '#a855f7',
      600: '#9333ea',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  };

  // Departments data
  const departments = [
    "Computer Applications",
    "Computer Science",
    "Information Technology",
    "Business Administration",
    "Economics",
    "Chemistry",
    "Physics",
    "Mathematics",
    "English Literature",
  ];

  // Years data based on user type
  const studentYears = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year",
    "Fifth Year",
    "Graduate Student",
    "PhD Candidate",
  ];

  const staffYears = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years",
  ];

  const facultyYears = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Visiting Faculty",
    "Adjunct Professor",
    "Emeritus Professor",
  ];

  // Get appropriate years based on user type
  const getYears = (userType) => {
    switch (userType) {
      case "student":
        return studentYears;
      case "staff":
        return staffYears;
      case "faculty":
        return facultyYears;
      default:
        return studentYears;
    }
  };

  // Form sections for better organization
  const formSections = [
    {
      title: "Personal Information",
      icon: User,
      description: "Tell us about yourself",
    },
    {
      title: "Academic Details",
      icon: GraduationCap,
      description: "Your educational background",
    },
    {
      title: "Account Security",
      icon: Shield,
      description: "Secure your account",
    },
  ];

  // Show SweetAlert for success
  const showSuccessAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      confirmButtonText: "Continue to Login",
      confirmButtonColor: colors.secondary[600],
      background: colors.secondary[50],
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200",
        title: "text-xl font-bold text-gray-900",
        confirmButton: "px-4 py-2 rounded-lg font-semibold",
      },
    });
  };

  // Show SweetAlert for error
  const showErrorAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: "Try Again",
      confirmButtonColor: "#dc2626",
      background: "#fef2f2",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200",
        title: "text-xl font-bold text-gray-900",
        confirmButton: "px-4 py-2 rounded-lg font-semibold",
      },
    });
  };

  // Show SweetAlert for warning
  const showWarningAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      confirmButtonText: "I Understand",
      confirmButtonColor: "#d97706",
      background: "#fffbeb",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200",
        title: "text-xl font-bold text-gray-900",
        confirmButton: "px-4 py-2 rounded-lg font-semibold",
      },
    });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!form.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (form.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (form.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(form.password)) {
      errors.password = "Password must contain letters and numbers";
    }

    if (!form.campusId.trim()) {
      errors.campusId = "Campus ID is required";
    } else if (form.campusId.length < 3) {
      errors.campusId = "Campus ID must be at least 3 characters";
    }

    if (form.phone && !/^\+?[\d\s-()]+$/.test(form.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update form values and clear field errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      // Reset year when user type changes
      if (name === "userType") {
        updatedForm.year = "";
      }

      return updatedForm;
    });

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Get user-friendly error message from backend
  const getErrorMessage = (error) => {
    const errorMessages = {
      "User already exists":
        "An account with this email already exists. Please try logging in or use a different email address.",
      "Invalid email format": "Please enter a valid university email address.",
      "Password too weak":
        "Password must be at least 6 characters with both letters and numbers.",
      "Campus ID already registered": "This Campus ID is already registered.",
      "Network error": "Please check your internet connection and try again.",
      "Server error": "System maintenance in progress. Please try again later.",
      "Validation failed":
        "Please check all required fields are filled correctly.",
    };

    return (
      errorMessages[error] ||
      "We encountered an issue. Please check your information and try again."
    );
  };

  // Submit form and call backend API directly
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!agreeToTerms) {
      showWarningAlert(
        "Terms & Conditions Required",
        "Please agree to the Terms and Conditions to continue."
      );
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      showErrorAlert(
        "Form Validation Error",
        "Please fix the highlighted errors before submitting."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const backendErrors = {};
          data.errors.forEach((error) => {
            if (error.path) {
              backendErrors[error.path] = error.msg;
            }
          });
          setFieldErrors(backendErrors);
          throw new Error("Please check the highlighted fields.");
        }
        throw new Error(data.message || data.error || "Registration failed");
      }

      showSuccessAlert(
        "Welcome to Our Community!",
        `Congratulations ${form.firstName}! Your account has been successfully created.`
      );

      // Reset form
      setForm({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        campusId: "",
        department: "",
        year: "",
        userType: "student",
      });
      setAgreeToTerms(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error.message);
      showErrorAlert("Registration Incomplete", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const TermsModal = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Terms and Conditions
              </h3>
              <p className="text-gray-600 mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setShowTerms(false)}
              className="text-gray-500 hover:text-gray-700 text-xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>

          <div className="space-y-6 text-gray-700">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-bold text-red-900 text-lg mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                IMPORTANT SECURITY NOTICE
              </h4>
              <p className="text-red-800">
                You are responsible for maintaining the confidentiality of your
                account credentials. The university shall not be held liable for
                data leaks resulting from failure to secure login information.
              </p>
            </div>

            <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 text-lg mb-2">
                Welcome to Our University Community
              </h4>
              <p className="text-blue-800">
                By creating an account, you agree to abide by our university's
                policies and guidelines.
              </p>
            </section>

            <section>
              <h5 className="font-bold text-gray-900 text-xl mb-3">
                1. Account Security & Data Responsibility
              </h5>
              <div className="space-y-2 ml-4">
                <p>
                  <strong>1.1 User Responsibility:</strong> You are responsible
                  for maintaining account security.
                </p>
                <p>
                  <strong>1.2 Data Protection:</strong> Use strong passwords and
                  report suspicious activity immediately.
                </p>
              </div>
            </section>

            <section>
              <h5 className="font-bold text-gray-900 text-xl mb-3">
                2. Data Collection & Usage
              </h5>
              <p>
                We collect personal data for academic purposes and university
                communications.
              </p>
            </section>

            <section>
              <h5 className="font-bold text-gray-900 text-xl mb-3">
                3. Acceptable Use Policy
              </h5>
              <p>
                The platform must be used for educational purposes and official
                university business.
              </p>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h5 className="font-bold text-yellow-900 mb-1">Acknowledgment</h5>
              <p className="text-yellow-800">
                By creating an account, you acknowledge that you have read and
                agree to these Terms.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowTerms(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => {
                setAgreeToTerms(true);
                setShowTerms(false);
              }}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              I Accept Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
      {formSections.map((section, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => setCurrentSection(index)}
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
              currentSection === index
                ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
                : "hover:bg-white/80 border-2 border-transparent"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                currentSection === index
                  ? "bg-blue-600 text-white"
                  : currentSection > index
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentSection > index ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                React.createElement(section.icon, { className: "w-5 h-5" })
              )}
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-sm text-gray-500 font-medium">Step {index + 1}</div>
              <div className={`font-semibold truncate ${
                currentSection === index ? "text-blue-700" : "text-gray-700"
              }`}>
                {section.title}
              </div>
            </div>
            {currentSection === index && (
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
            )}
          </button>
          {index < formSections.length - 1 && (
            <div className="flex items-center justify-center px-2">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      {/* Animated Background with Images */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${backgroundImages[currentBgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Background Overlay with Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-indigo-900/80" />

      {/* Main Content */}
      <div className="min-h-screen relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Campus Lost & Found
                  </h1>
                  <p className="text-blue-600 font-semibold">Registration Portal</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join our academic community and begin your educational journey
              </p>
            </div>
          </div>

          {/* Horizontal Step Indicator */}
          <StepIndicator />

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            {/* Form Header */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-emerald-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    {React.createElement(formSections[currentSection].icon, {
                      className: "w-6 h-6 text-white",
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {formSections[currentSection].title}
                    </h2>
                    <p className="text-blue-100">
                      {formSections[currentSection].description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">Step {currentSection + 1} of {formSections.length}</div>
                  <div className="w-32 bg-white/30 rounded-full h-2 mt-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentSection + 1) / formSections.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                {currentSection === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-semibold text-gray-700 mb-3"
                        >
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                              fieldErrors.firstName
                                ? "border-red-300 focus:border-red-500 bg-red-50"
                                : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                            }`}
                          />
                        </div>
                        {fieldErrors.firstName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {fieldErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-semibold text-gray-700 mb-3"
                        >
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                              fieldErrors.lastName
                                ? "border-red-300 focus:border-red-500 bg-red-50"
                                : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                            }`}
                          />
                        </div>
                        {fieldErrors.lastName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {fieldErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        University Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john.doe@university.edu"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                            fieldErrors.email
                              ? "border-red-300 focus:border-red-500 bg-red-50"
                              : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                          }`}
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="phone"
                          name="phone"
                          placeholder="+1 (555) 123-4567"
                          value={form.phone}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                            fieldErrors.phone
                              ? "border-red-300 focus:border-red-500 bg-red-50"
                              : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                          }`}
                        />
                      </div>
                      {fieldErrors.phone && (
                        <p className="mt-2 text-sm text-red-600">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Academic Details Section */}
                {currentSection === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="campusId"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Campus ID *
                      </label>
                      <div className="relative">
                        <IdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="campusId"
                          name="campusId"
                          placeholder="Enter your campus ID"
                          value={form.campusId}
                          onChange={handleChange}
                          required
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                            fieldErrors.campusId
                              ? "border-red-300 focus:border-red-500 bg-red-50"
                              : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                          }`}
                        />
                      </div>
                      {fieldErrors.campusId && (
                        <p className="mt-2 text-sm text-red-600">
                          {fieldErrors.campusId}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="userType"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        I am a *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                        <select
                          id="userType"
                          name="userType"
                          value={form.userType}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 appearance-none bg-white"
                        >
                          <option value="student">Student</option>
                          <option value="staff">Staff Member</option>
                          <option value="faculty">Faculty Member</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="department"
                          className="block text-sm font-semibold text-gray-700 mb-3"
                        >
                          Department
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                          <select
                            id="department"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 appearance-none bg-white"
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept, index) => (
                              <option key={index} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="year"
                          className="block text-sm font-semibold text-gray-700 mb-3"
                        >
                          {form.userType === "student"
                            ? "Academic Year"
                            : form.userType === "staff"
                            ? "Experience Level"
                            : "Faculty Position"}
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                          <select
                            id="year"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 appearance-none bg-white"
                          >
                            <option value="">
                              Select{" "}
                              {form.userType === "student"
                                ? "Year"
                                : form.userType === "staff"
                                ? "Experience"
                                : "Position"}
                            </option>
                            {getYears(form.userType).map((year, index) => (
                              <option key={index} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Security Section */}
                {currentSection === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={form.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                          className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                            fieldErrors.password
                              ? "border-red-300 focus:border-red-500 bg-red-50"
                              : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {fieldErrors.password ? (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {fieldErrors.password}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">
                          Must be at least 6 characters with letters and numbers
                        </p>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                      <div className="flex items-start space-x-4">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={agreeToTerms}
                          onChange={(e) =>
                            setAgreeToTerms(e.target.checked)
                          }
                          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-700 flex-1"
                        >
                          I agree to the{" "}
                          <button
                            type="button"
                            onClick={() => setShowTerms(true)}
                            className="text-blue-600 hover:text-blue-500 font-semibold underline"
                          >
                            Terms and Conditions
                          </button>
                          <span className="block text-red-600 text-sm mt-2 font-medium">
                            You are responsible for maintaining account security
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <Shield className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-amber-900 text-lg mb-2">
                            Security Notice
                          </h4>
                          <p className="text-amber-800">
                            Keep your credentials secure. You are responsible for 
                            account safety and must report any suspicious activity immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSection(Math.max(0, currentSection - 1))
                    }
                    disabled={currentSection === 0}
                    className="flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>

                  {currentSection < formSections.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentSection(
                          Math.min(
                            formSections.length - 1,
                            currentSection + 1
                          )
                        )
                      }
                      className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-colors shadow-lg"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !agreeToTerms}
                      className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Create Account</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-500 font-semibold text-lg"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 inline-block border border-white/20 shadow-lg">
              <p className="text-gray-600">
                &copy; {new Date().getFullYear()} Campus Lost & Found - Academic Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {showTerms && <TermsModal />}
    </>
  );
};

export default Register;