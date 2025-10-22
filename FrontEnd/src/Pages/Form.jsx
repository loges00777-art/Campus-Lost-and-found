import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  MapPin,
  Calendar,
  Tag,
  Mail,
  Phone,
  X,
  Plus,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  Briefcase,
  Shirt,
  Book,
  Glasses,
  Gem,
  FileText,
  Key,
  Heart,
  Package,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "",
    foundOrLost: "found",
    contactEmail: "",
    contactPhone: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState({});

  const categories = [
    {
      value: "electronics",
      label: "Electronics",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      value: "bags",
      label: "Bags & Wallets",
      icon: Briefcase,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
    },
    {
      value: "clothing",
      label: "Clothing",
      icon: Shirt,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
    },
    {
      value: "books",
      label: "Books",
      icon: Book,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
    },
    {
      value: "accessories",
      label: "Accessories",
      icon: Glasses,
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50",
    },
    {
      value: "jewelry",
      label: "Jewelry",
      icon: Gem,
      color: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-50",
    },
    {
      value: "documents",
      label: "Documents",
      icon: FileText,
      color: "from-red-500 to-pink-500",
      bg: "bg-red-50",
    },
    {
      value: "keys",
      label: "Keys",
      icon: Key,
      color: "from-gray-500 to-gray-700",
      bg: "bg-gray-50",
    },
    {
      value: "pets",
      label: "Pets",
      icon: Heart,
      color: "from-rose-500 to-red-500",
      bg: "bg-rose-50",
    },
    {
      value: "other",
      label: "Other",
      icon: Package,
      color: "from-slate-500 to-gray-600",
      bg: "bg-slate-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (new Date(formData.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    if (
      formData.contactPhone &&
      !/^\d{10,15}$/.test(formData.contactPhone.replace(/\D/g, ""))
    ) {
      newErrors.contactPhone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFocus = (fieldName) => {
    setIsFocused((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    setIsFocused((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please select an image file (JPEG, PNG, etc.)",
          confirmButtonColor: "#3b82f6",
          background: "#0f172a",
          color: "white",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Please select an image smaller than 5MB",
          confirmButtonColor: "#3b82f6",
          background: "#0f172a",
          color: "white",
        });
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      category: "",
      foundOrLost: "found",
      contactEmail: "",
      contactPhone: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
    setIsFocused({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Form Validation",
        text: "Please check the form for errors",
        confirmButtonColor: "#3b82f6",
        background: "#0f172a",
        color: "white",
      });
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "foundOrLost") {
          data.append("status", value);
        } else if (key === "contactEmail") {
          data.append("contactemail", value);
        } else if (key === "contactPhone") {
          data.append("contactphone", value);
        } else if (value) {
          data.append(key, value);
        }
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await axios.post("/api/items", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Item has been reported successfully!",
        confirmButtonColor: "#10b981",
        background: "#0f172a",
        color: "white",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          resetForm();
          e.target.reset();
        },
      });
    } catch (err) {
      console.error("Submission error:", err);

      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err.response?.data?.error ||
          "Failed to submit the form. Please try again.",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="py-8 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Main Form Container */}
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden"
          >
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-slate-800 via-purple-900/80 to-slate-800 p-12 text-white overflow-hidden">
              {/* Header background pattern */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
              </div>

              <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl mb-6 border border-white/20"
                >
                  <Plus className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Report Item
                </h2>
                <p className="text-slate-300 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Help reunite lost treasures with their owners. Your report
                  creates hope.
                </p>

                {/* Status badges */}
                <motion.div
                  className="flex justify-center gap-6 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    {
                      icon: Shield,
                      text: "Secure & Private",
                      color: "text-blue-300",
                    },
                    {
                      icon: Zap,
                      text: "Instant Processing",
                      color: "text-amber-300",
                    },
      
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20"
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="text-sm font-semibold text-white">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Form Content */}
            <div className="p-10">
              <motion.form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Title */}
                  <motion.div className="lg:col-span-2" variants={itemVariants}>
                    <label
                      htmlFor="title"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Tag className="w-4 h-4 text-blue-400" />
                      </div>
                      Item Title *
                    </label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onFocus={() => handleFocus("title")}
                        onBlur={() => handleBlur("title")}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 ${
                          errors.title
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-blue-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.title ? "shadow-lg shadow-blue-500/10" : ""
                        }`}
                        placeholder="e.g., Black iPhone 13 Pro with blue case"
                      />
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <Tag className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.title && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.title}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Description */}
                  <motion.div className="lg:col-span-2" variants={itemVariants}>
                    <label
                      htmlFor="description"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <FileText className="w-4 h-4 text-green-400" />
                      </div>
                      Description *
                    </label>
                    <div className="relative">
                      <motion.textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onFocus={() => handleFocus("description")}
                        onBlur={() => handleBlur("description")}
                        rows={4}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 resize-none ${
                          errors.description
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-green-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.description
                            ? "shadow-lg shadow-green-500/10"
                            : ""
                        }`}
                        placeholder="Provide detailed description including color, brand, distinctive features, serial numbers, or any identifying marks..."
                      />
                      <div className="absolute left-5 top-6">
                        <FileText className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.description && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Location */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="location"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <MapPin className="w-4 h-4 text-purple-400" />
                      </div>
                      Location *
                    </label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onFocus={() => handleFocus("location")}
                        onBlur={() => handleBlur("location")}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 ${
                          errors.location
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-purple-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.location
                            ? "shadow-lg shadow-purple-500/10"
                            : ""
                        }`}
                        placeholder="Where was it found/lost? (e.g., Central Park, 5th Avenue)"
                      />
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <MapPin className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.location && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.location}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Date */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="date"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-amber-500/20 rounded-lg">
                        <Calendar className="w-4 h-4 text-amber-400" />
                      </div>
                      Date *
                    </label>
                    <div className="relative">
                      <motion.input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        onFocus={() => handleFocus("date")}
                        onBlur={() => handleBlur("date")}
                        max={new Date().toISOString().split("T")[0]}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 ${
                          errors.date
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-amber-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.date ? "shadow-lg shadow-amber-500/10" : ""
                        }`}
                      />
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <Calendar className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.date && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.date}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Category */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="category"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Package className="w-4 h-4 text-cyan-400" />
                      </div>
                      Category *
                    </label>
                    <div className="relative">
                      <motion.select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        onFocus={() => handleFocus("category")}
                        onBlur={() => handleBlur("category")}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 pr-12 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white appearance-none ${
                          errors.category
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-cyan-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.category
                            ? "shadow-lg shadow-cyan-500/10"
                            : ""
                        }`}
                      >
                        <option value="" className="bg-slate-800">
                          Select category
                        </option>
                        {categories.map((cat) => (
                          <option
                            key={cat.value}
                            value={cat.value}
                            className="bg-slate-800"
                          >
                            {cat.label}
                          </option>
                        ))}
                      </motion.select>
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <Package className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Tag className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.category && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.category}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Found or Lost */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      Status *
                    </label>
                    <div className="flex gap-4 p-2 bg-slate-700/50 rounded-2xl backdrop-blur-sm">
                      {[
                        {
                          value: "found",
                          label: "Found",
                          color: "from-emerald-500 to-green-500",
                          icon: CheckCircle2,
                        },
                        {
                          value: "lost",
                          label: "Lost",
                          color: "from-orange-500 to-red-500",
                          icon: AlertCircle,
                        },
                      ].map((option) => (
                        <motion.label
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 ${
                            formData.foundOrLost === option.value
                              ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                              : "text-slate-400 hover:text-white hover:bg-slate-600/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="foundOrLost"
                            value={option.value}
                            checked={formData.foundOrLost === option.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <option.icon className="w-5 h-5" />
                          <span className="font-semibold">{option.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Contact Email */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="contactEmail"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Mail className="w-4 h-4 text-blue-400" />
                      </div>
                      Contact Email
                    </label>
                    <div className="relative">
                      <motion.input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        onFocus={() => handleFocus("contactEmail")}
                        onBlur={() => handleBlur("contactEmail")}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 ${
                          errors.contactEmail
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-blue-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.contactEmail
                            ? "shadow-lg shadow-blue-500/10"
                            : ""
                        }`}
                        placeholder="you@example.com"
                      />
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.contactEmail && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.contactEmail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Contact Phone */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="contactPhone"
                      className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4"
                    >
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Phone className="w-4 h-4 text-indigo-400" />
                      </div>
                      Contact Phone
                    </label>
                    <div className="relative">
                      <motion.input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        onFocus={() => handleFocus("contactPhone")}
                        onBlur={() => handleBlur("contactPhone")}
                        className={`w-full border-2 rounded-2xl px-6 py-5 pl-14 focus:outline-none transition-all duration-500 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 ${
                          errors.contactPhone
                            ? "border-red-400/50 focus:border-red-400 bg-red-500/10"
                            : "border-slate-600 focus:border-indigo-400 focus:bg-slate-600/30"
                        } ${
                          isFocused.contactPhone
                            ? "shadow-lg shadow-indigo-500/10"
                            : ""
                        }`}
                        placeholder="+1234567890"
                      />
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <Phone className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.contactPhone && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 flex items-center gap-2 text-sm text-red-400"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.contactPhone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Image Upload */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-300 mb-4">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Camera className="w-4 h-4 text-pink-400" />
                    </div>
                    Upload Image (optional)
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-slate-600 rounded-2xl p-10 transition-all duration-500 hover:border-pink-400 hover:bg-slate-700/30 bg-slate-700/20 backdrop-blur-sm"
                  >
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <motion.label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center cursor-pointer group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-6 transition-transform duration-300 border-2 border-dashed border-pink-400/30 group-hover:border-pink-400/60"
                      >
                        <Upload className="w-10 h-10 text-pink-400" />
                      </motion.div>
                      <p className="text-slate-300 font-semibold mb-3 text-xl text-center">
                        Click to upload image
                      </p>
                      <p className="text-sm text-slate-400 text-center">
                        Supported formats: PNG, JPG, JPEG
                        <br />
                        Maximum file size: 5MB
                      </p>
                    </motion.label>
                  </motion.div>

                  <AnimatePresence>
                    {imagePreview && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mt-8 relative w-72 h-72 rounded-3xl overflow-hidden shadow-2xl group border-2 border-white/20"
                      >
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 focus:outline-none transition-all duration-300 shadow-lg"
                          aria-label="Remove image"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                          <p className="font-semibold">Image Preview</p>
                          <p className="text-sm text-slate-300">
                            Ready to upload
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.div className="pt-8" variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className={`w-full py-6 rounded-2xl text-white font-bold text-xl transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl ${
                      loading
                        ? "bg-slate-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 hover:shadow-3xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Processing Your Report...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Submit Report</span>
                      </>
                    )}
                  </motion.button>

                  {/* Help text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-slate-400 text-sm mt-6"
                  >
                    By submitting this form, you agree to our terms of service and
                    privacy policy.
                    <br />
                    <span className="text-slate-500">
                      Your information is secure and encrypted.
                    </span>
                  </motion.p>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddItemForm;