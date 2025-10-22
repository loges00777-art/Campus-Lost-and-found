import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./Home"; // Import Home component
const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const numberVariants = {
    hover: {
      scale: 1.05,
      transition: { yoyo: Infinity, duration: 1 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6">
      <motion.div
        className="text-center max-w-md md:max-w-lg p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative mb-8" variants={itemVariants}>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 animate-pulse"></div>
          <motion.div
            className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full shadow-lg"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
          variants={numberVariants}
          animate="hover"
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>

        <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
          Oops! The page you're looking for doesn't exist or may have been
          moved.
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all rounded-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-sm"></span>
            <span className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
