import React, { useState } from "react";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaCheck,
  FaExclamationTriangle,
  FaClock,
  FaHeadset,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/* ---------- env ---------- */
const CONTACT_API = import.meta.env.VITE_CONTACT_API;

/* ---------- helpers ---------- */
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v) => /^[0-9+\-\s()]{10,}$/.test(v);

/* ---------- subject options ---------- */
const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Technical Support",
  "Account Issue",
  "Feature Request",
  "Bug Report",
  "Partnership",
  "Other",
];

/* ---------- sweetalert configurations ---------- */
const showSuccessAlert = (message) => {
  MySwal.fire({
    title: <div className="text-green-600 text-2xl font-bold">🎉 Success!</div>,
    html: <p className="text-gray-700 text-lg">{message}</p>,
    icon: "success",
    background: "#f0fdf4",
    color: "#166534",
    confirmButtonText: "Great!",
    confirmButtonColor: "#16a34a",
    customClass: {
      popup: "rounded-3xl shadow-2xl border-2 border-green-200",
      confirmButton:
        "px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp animate__faster",
    },
  });
};

const showErrorAlert = (message) => {
  MySwal.fire({
    title: <div className="text-red-600 text-2xl font-bold">😔 Oops!</div>,
    html: <p className="text-gray-700 text-lg">{message}</p>,
    icon: "error",
    background: "#fef2f2",
    color: "#dc2626",
    confirmButtonText: "Try Again",
    confirmButtonColor: "#ef4444",
    customClass: {
      popup: "rounded-3xl shadow-2xl border-2 border-red-200",
      confirmButton:
        "px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
    },
    showClass: {
      popup: "animate__animated animate__headShake animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp animate__faster",
    },
  });
};

const showConfirmationAlert = (onConfirm) => {
  MySwal.fire({
    title: (
      <div className="text-blue-600 text-2xl font-bold">🤔 Are you sure?</div>
    ),
    html: (
      <p className="text-gray-700 text-lg">
        Please review your message before sending.
      </p>
    ),
    icon: "question",
    background: "#f0f9ff",
    color: "#0369a1",
    showCancelButton: true,
    confirmButtonText: "Yes, send it!",
    cancelButtonText: "Review again",
    confirmButtonColor: "#3b82f6",
    cancelButtonColor: "#6b7280",
    customClass: {
      popup: "rounded-3xl shadow-2xl border-2 border-blue-200",
      confirmButton:
        "px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
      cancelButton:
        "px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300",
    },
    showClass: {
      popup: "animate__animated animate__bounceIn animate__faster",
    },
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

const showLoadingAlert = () => {
  MySwal.fire({
    title: (
      <div className="text-blue-600 text-2xl font-bold">⏳ Sending...</div>
    ),
    html: (
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
        <p className="text-gray-600">
          We're sending your message to the admin team
        </p>
      </div>
    ),
    background: "#f0f9ff",
    color: "#0369a1",
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: {
      popup: "rounded-3xl shadow-2xl border-2 border-blue-200",
    },
    showClass: {
      popup: "animate__animated animate__fadeIn animate__faster",
    },
  });
};

/* ---------- reusable field component ---------- */
function Field({
  id,
  label,
  type = "text",
  rows,
  required,
  value,
  onChange,
  onBlur,
  error,
  success,
  icon,
  placeholder,
}) {
  const base =
    "py-3 px-4 pl-11 block w-full border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm";

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <InputComponent
          type={type}
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${base} ${icon ? "pl-10" : ""} ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : success
              ? "border-green-400 focus:border-green-500 focus:ring-green-200"
              : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
          }`}
          required={required}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-600 flex items-center gap-1"
          >
            <FaExclamationTriangle className="flex-shrink-0 text-xs" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- main component ---------- */
export default function AdminContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- validation ---------- */
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    else if (formData.name.trim().length < 2) e.name = "Name is too short";

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!isEmail(formData.email)) e.email = "Enter a valid email";

    if (formData.phone && !isPhone(formData.phone))
      e.phone = "Enter a valid phone number";

    if (!formData.subject.trim()) e.subject = "Subject is required";

    if (!formData.message.trim()) e.message = "Message is required";
    else if (formData.message.trim().length < 10)
      e.message = "Message should be at least 10 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  };

  const submitForm = async () => {
    if (!CONTACT_API) {
      showErrorAlert(
        "Contact system is currently unavailable. Please try again later."
      );
      return;
    }

    showLoadingAlert();

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      MySwal.close();

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status}. Please try again.`);
      }

      showSuccessAlert(
        "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTouched({});
    } catch (err) {
      console.error("Submission error:", err);
      showErrorAlert(
        "Failed to send message. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      phone: true,
    });

    if (!validate()) {
      showErrorAlert("Please fix the errors in the form before submitting.");
      return;
    }

    showConfirmationAlert(submitForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px),
                             linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/25"
          >
            <FaPaperPlane className="text-white text-2xl" />
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Contact Admin
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? Send us a message and our team
            will get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Contact Info Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                Get In Touch
              </h3>
              <div className="space-y-6">
                <ContactItem
                  icon={<FaMapMarkerAlt className="text-blue-400 text-lg" />}
                  title="Address"
                  text="Methalodai"
                  bgColor="from-blue-500/20 to-blue-600/20"
                />
                <ContactItem
                  icon={<FaPhone className="text-green-400 text-lg" />}
                  title="Phone"
                  text="91508 04220"
                  link="tel:+91 91508 04220"
                  bgColor="from-green-500/20 to-green-600/20"
                />
                <ContactItem
                  icon={<FaEnvelope className="text-purple-400 text-lg" />}
                  title="Email"
                  text="admin@email.com"
                  link="mailto:admin@email.com"
                  bgColor="from-purple-500/20 to-purple-600/20"
                />
              </div>
            </div>

            {/* Response Time Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg border border-blue-400/30 rounded-3xl p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-bold text-white mb-4 flex items-center gap-3">
                <FaClock className="text-blue-300 text-lg" />
                Response Time
              </h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                We typically respond to all messages within 24 hours during
                business days. Emergency support available for critical issues.
              </p>
            </motion.div>

            {/* Quick Action Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-lg border border-purple-400/30 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="font-bold mb-4 flex items-center gap-3 text-lg">
                <FaHeadset className="text-white text-lg" />
                Quick Support
              </h4>
              <p className="text-purple-100 text-sm mb-4 leading-relaxed">
                Need immediate help? Call our support line for urgent matters.
              </p>
              <a
                href="tel:+919150804220"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <FaPhone className="text-sm" />
                Call Now
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl shadow-2xl border border-white/20 p-10 bg-white/10 backdrop-blur-lg"
            >
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    id="name"
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                    success={touched.name && !errors.name && formData.name}
                    icon={<FaUser className="text-sm" />}
                    placeholder="Enter your full name"
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    success={touched.email && !errors.email && formData.email}
                    icon={<FaEnvelope className="text-sm" />}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field
                    id="phone"
                    label="Phone Number (Optional)"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && errors.phone}
                    success={touched.phone && !errors.phone && formData.phone}
                    icon={<FaPhone className="text-sm" />}
                    placeholder="+1 (555) 123-4567"
                  />

                  <motion.div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-white"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`py-3 px-4 block w-full border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 ${
                        errors.subject && touched.subject
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : !errors.subject &&
                            touched.subject &&
                            formData.subject
                          ? "border-green-400 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    >
                      <option value="" className="text-gray-500">Select a subject</option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <AnimatePresence>
                      {errors.subject && touched.subject && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-red-300 flex items-center gap-1"
                        >
                          <FaExclamationTriangle className="flex-shrink-0 text-xs" />
                          {errors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <Field
                  id="message"
                  label="Your Message"
                  type="textarea"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && errors.message}
                  success={
                    touched.message && !errors.message && formData.message
                  }
                  placeholder="Please describe your inquiry in detail..."
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg border border-white/20 hover:from-blue-600 hover:to-purple-700"
                >
                  {isSubmitting ? (
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
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      Send Message to Admin
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Contact Info Item ---------- */
function ContactItem({ icon, title, text, link, description, bgColor = "from-gray-500/20 to-gray-600/20" }) {
  return (
    <motion.div
      className={`flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-r ${bgColor} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer`}
      whileHover={{ x: 5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-200 border border-white/10">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-white mb-1 text-lg">{title}</h3>
        {link ? (
          <a
            href={link}
            className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        ) : (
          <p className="text-gray-200 font-medium text-base">{text}</p>
        )}
        {description && (
          <p className="text-sm text-gray-300 mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
}