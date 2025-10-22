import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";


// === Icons ===
const HomeIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const FormIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const MenuIcon = ({ isOpen }) => (
  <svg
    className="w-6 h-6 transition-transform duration-200 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
);

// === Reusable Components ===
const AuthButtons = ({ compact, navigate }) => (
  <>
    <button
      onClick={() => navigate("/login")}
      className={`px-${compact ? "3" : "6"} py-${
        compact ? "2" : "2.5"
      } text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition duration-200 border border-transparent hover:border-gray-200 text-${
        compact ? "sm" : "base"
      }`}
    >
      Sign In
    </button>
    <button
      onClick={() => navigate("/register")}
      className={`bg-gradient-to-r from-blue-600 to-purple-700 text-white px-${
        compact ? "3" : "6"
      } py-${
        compact ? "2" : "2.5"
      } rounded-xl hover:from-blue-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition duration-200 font-medium text-${
        compact ? "sm" : "base"
      }`}
    >
      Get Started
    </button>
  </>
);

const UserMenu = ({
  userName,
  email,
  onLogout,
  isCompact = false,
  dropdownOpen,
  toggleDropdown,
  dropdownRef,
}) => (
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={toggleDropdown}
      className={`flex items-center ${
        isCompact ? "space-x-2 px-3 py-2" : "space-x-3 px-4 py-2.5"
      } bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all`}
    >
      <div
        className={`${
          isCompact ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm"
        } bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white font-medium`}
      >
        {userName[0]?.toUpperCase()}
      </div>
      {!isCompact && (
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
            {userName}
          </span>
          <span className="text-xs text-gray-500 truncate max-w-[120px]">
            {email}
          </span>
        </div>
      )}
      <ChevronDownIcon />
    </button>

    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {userName}
          </p>
          <p className="text-xs text-gray-500 truncate mt-1">{email}</p>
        </div>
        <div className="p-2">
          <Link
            to="/profile"
            onClick={toggleDropdown}
            className="flex items-center space-x-3 w-full px-3 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm transition-colors"
          >
            <UserIcon />
            <span>My Profile</span>
          </Link>
        </div>
        <div className="p-2 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
          >
            <LogoutIcon />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    )}
  </div>
);

// === Main Header ===
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const email = currentUser?.email || "";
  const userName = useMemo(
    () => currentUser?.displayName || email?.split("@")[0] || "User",
    [currentUser, email]
  );

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Report Item", path: "/form", icon: <FormIcon /> },
  ];

  const isActiveRoute = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  };

  // ✅ Clean logout handler
  const handleLogout = async () => {
    try {
      // Show confirmation before logging out
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You’ll be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out",
      });

      if (confirmResult.isConfirmed) {
        await signOut(auth);
        localStorage.removeItem("token");
        sessionStorage.clear();
        closeAllMenus();

        await Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);

      Swal.fire({
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") closeAllMenus();
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [dropdownOpen, isMenuOpen]);

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeAllMenus}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-base">
                LF
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight truncate">
                Lost & Found
              </span>
              <span className="text-xs text-gray-500 hidden xs:block truncate">
                Reuniting people
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-center max-w-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition duration-200 border text-base ${
                  isActiveRoute(link.path)
                    ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            {!currentUser ? (
              <AuthButtons compact={false} navigate={navigate} />
            ) : (
              <UserMenu
                userName={userName}
                email={email}
                onLogout={handleLogout}
                dropdownOpen={dropdownOpen}
                toggleDropdown={() => setDropdownOpen((prev) => !prev)}
                dropdownRef={dropdownRef}
              />
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center md:hidden space-x-2">
            {currentUser && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {userName[0]?.toUpperCase()}
              </div>
            )}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 shadow-sm"
              aria-label="Toggle menu"
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 mt-2 pt-4 pb-4 border-t border-gray-200"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeAllMenus}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-base border ${
                  isActiveRoute(link.path)
                    ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="h-px bg-gray-200 my-2" />

            {!currentUser ? (
              <div className="flex flex-col space-y-2">
                <AuthButtons compact={true} navigate={navigate} />
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {userName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={closeAllMenus}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 transition"
                >
                  <UserIcon />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base text-red-600 hover:bg-red-50 transition font-medium"
                >
                  <LogoutIcon />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
