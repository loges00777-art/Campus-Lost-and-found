import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Eye, Edit3 } from "lucide-react";

const Profile = () => {
  const { currentUser, token, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    department: "",
    year: "",
  });

  // ✅ Default departments
  const departments = [
    "Computer Applications",
    "Computer Science",
    "Business Administration",
    "Information Technology",
    "Economics",
    "Physics",
    "Chemistry",
    "Mathematics",
    "English Literature",
    "Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Biotechnology",
    "Psychology",
    "Sociology",
    "History",
    "Political Science"
  ];

  // ✅ Years
  const years = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year",
    "Fifth Year",
    "Graduate",
    "Post Graduate",
    "PhD"
  ];

  // ✅ Fetch profile data
  const fetchProfile = async () => {
    if (!authLoading && currentUser && token) {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          phone: res.data.phone || "",
          department: res.data.department || "",
          year: res.data.year || "",
        });
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    } else if (!authLoading && !currentUser) {
      setError("User not signed in");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser, token, authLoading]);

  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Update profile
  const handleUpdate = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Update Profile?",
        text: "Do you want to save these changes?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update it",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#10B981",
        cancelButtonColor: "#6B7280",
      });

      if (!confirm.isConfirmed) return;

      const payload = { ...formData };

      await axios.put("http://localhost:5000/api/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await Swal.fire({
        title: "Updated!",
        text: "Your profile has been updated.",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
      
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      await Swal.fire({
        title: "Error!",
        text: err.response?.data?.error || err.message,
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  // ✅ Loading spinner
  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-200 border-t-emerald-500 mx-auto mb-4"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-emerald-100"></div>
            </div>
            <p className="text-slate-600 text-lg font-medium">Loading your profile...</p>
            <p className="text-slate-400 text-sm mt-2">Please wait a moment</p>
          </div>
        </div>
      </>
    );

  // ✅ Error message
  if (error)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Error Loading Profile</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );

  if (!profile)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Profile Data</h3>
            <p className="text-slate-600">We couldn't find any profile information.</p>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header Block */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
            <div className="relative h-48 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-8">
                <div className="flex items-end space-x-6">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-2xl">
                    <div className="w-28 h-28 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center text-white text-4xl font-bold backdrop-blur-sm border border-white/20">
                      {profile?.firstName?.[0] || "U"}
                      {profile?.lastName?.[0] || ""}
                    </div>
                  </div>
                  <div className="pb-2">
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {profile?.firstName} {profile?.lastName}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full capitalize border border-white/30">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {profile?.userType || "User"}
                      </span>
                      <span className="text-white/80 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Joined {new Date(profile.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-600 font-medium">Profile Active</span>
                </div>
                
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    editMode 
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg transform -translate-y-1" 
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  }`}
                >
                  {editMode ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Cancel Editing</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Profile Information Block */}
            <div className="xl:col-span-3">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                      <p className="text-slate-500">Manage your personal details and preferences</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold border ${
                      editMode
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {editMode ? <Edit3 size={16} /> : <Eye size={16} />}
                    <span>{editMode ? "Editing Mode" : "View Mode"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Read-only Information Blocks */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                      Account Information
                    </h3>
                  </div>
                  
                  {[
                    { label: "Email Address", key: "email", icon: "email" },
                    { label: "Campus ID", key: "campusId", icon: "badge" },
                    { label: "Account Type", key: "userType", icon: "shield" },
                  ].map(({ label, key, icon }) => (
                    <div key={key} className="group">
                      <label className="text-sm font-semibold text-slate-700 flex items-center mb-3">
                        <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-slate-200 transition-colors">
                          {icon === "email" && (
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                          {icon === "badge" && (
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                          )}
                          {icon === "shield" && (
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </span>
                        {label}
                      </label>
                      <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl group-hover:border-slate-300 transition-colors">
                        <span className="text-slate-900 font-medium">
                          {key === "userType" ? (profile[key] || "User").toLowerCase() : profile[key] || "Not provided"}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Editable Information Blocks */}
                  <div className="lg:col-span-2 mt-6">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      Personal Details
                    </h3>
                  </div>

                  {[
                    { key: "firstName", label: "First Name", icon: "user" },
                    { key: "lastName", label: "Last Name", icon: "users" },
                    { key: "phone", label: "Phone Number", icon: "phone" },
                  ].map(({ key, label, icon }) => (
                    <div key={key} className="group">
                      <label className="text-sm font-semibold text-slate-700 flex items-center mb-3">
                        <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-slate-200 transition-colors">
                          {icon === "user" && (
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          {icon === "users" && (
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                          )}
                          {icon === "phone" && (
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          )}
                        </span>
                        {label}
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name={key}
                          value={formData[key] || ""}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 placeholder-slate-400"
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                      ) : (
                        <div className="p-4 bg-slate-50/50 border-2 border-transparent rounded-2xl group-hover:border-slate-200 transition-colors">
                          <span className={`${!profile[key] ? "text-slate-400" : "text-slate-900 font-medium"}`}>
                            {profile[key] || "Not provided"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Department Dropdown Block */}
                  <div className="group">
                    <label className="text-sm font-semibold text-slate-700 flex items-center mb-3">
                      <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-slate-200 transition-colors">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </span>
                      Department
                    </label>
                    {editMode ? (
                      <select
                        name="department"
                        value={formData.department || ""}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 appearance-none"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-4 bg-slate-50/50 border-2 border-transparent rounded-2xl group-hover:border-slate-200 transition-colors">
                        <span className={`${!profile.department ? "text-slate-400" : "text-slate-900 font-medium"}`}>
                          {profile.department || "Not selected"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Year Dropdown Block */}
                  <div className="group">
                    <label className="text-sm font-semibold text-slate-700 flex items-center mb-3">
                      <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-slate-200 transition-colors">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      Year
                    </label>
                    {editMode ? (
                      <select
                        name="year"
                        value={formData.year || ""}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 appearance-none"
                      >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-4 bg-slate-50/50 border-2 border-transparent rounded-2xl group-hover:border-slate-200 transition-colors">
                        <span className={`${!profile.year ? "text-slate-400" : "text-slate-900 font-medium"}`}>
                          {profile.year || "Not selected"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {editMode && (
                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <button
                      onClick={handleUpdate}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Blocks */}
            <div className="space-y-8">
              {/* Account Status Block */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Account Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-2xl">
                    <span className="text-slate-600">Status</span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-2xl">
                    <span className="text-slate-600">Verified</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {profile.email ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-2xl">
                    <span className="text-slate-600">Member since</span>
                    <span className="text-slate-900 font-medium">
                      {new Date(profile.registrationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Block */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">Change Password</span>
                  </button>
                  
                  <button className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">Privacy Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;