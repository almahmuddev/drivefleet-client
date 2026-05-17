import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import {
  RiCarLine,
  RiMenuLine,
  RiCloseLine,
  RiSunLine,
  RiMoonLine,
  RiUserLine,
  RiAddCircleLine,
  RiCalendarLine,
  RiListCheck,
  RiLogoutBoxLine,
} from "react-icons/ri";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Cars" },
];

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      setMenuOpen(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-dark-950/90 backdrop-blur-md shadow-sm border-b border-dark-100 dark:border-dark-800"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <RiCarLine className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl text-dark-900 dark:text-white tracking-tight">
              Drive<span className="text-brand-500">Fleet</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
                <span className="px-3 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors block">
                  {link.label}
                </span>
              </NavLink>
            ))}
            {user && (
              <NavLink to="/my-bookings" className={navLinkClass}>
                <span className="px-3 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors block">
                  My Bookings
                </span>
              </NavLink>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-dark-500 dark:text-dark-400 hover:text-brand-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <RiSunLine className="text-lg" />
              ) : (
                <RiMoonLine className="text-lg" />
              )}
            </button>

            {user ? (
              /* Profile Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-all"
                  title={user.displayName || user.email}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-brand-400"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-medium font-display">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden lg:block text-sm font-body font-medium text-dark-700 dark:text-dark-300 max-w-[100px] truncate">
                    {user.displayName || "User"}
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-dark-100 dark:border-dark-700 overflow-hidden"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-dark-100 dark:border-dark-700">
                        <p className="text-sm font-medium font-body text-dark-900 dark:text-white truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-dark-500 dark:text-dark-400 truncate font-body">
                          {user.email}
                        </p>
                      </div>

                      {/* Dropdown Items */}
                      {[
                        { to: "/add-car", icon: RiAddCircleLine, label: "Add Car" },
                        { to: "/my-bookings", icon: RiCalendarLine, label: "My Bookings" },
                        { to: "/my-added-cars", icon: RiListCheck, label: "My Added Cars" },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-dark-700 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 hover:text-brand-500 transition-colors"
                        >
                          <item.icon className="text-base opacity-70" />
                          {item.label}
                        </Link>
                      ))}

                      <div className="border-t border-dark-100 dark:border-dark-700">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <RiLogoutBoxLine className="text-base" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm hidden md:inline-flex">
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <RiCloseLine className="text-xl" />
              ) : (
                <RiMenuLine className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-dark-950 border-t border-dark-100 dark:border-dark-800"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 dark:bg-brand-900/20 text-brand-500"
                        : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              {user && (
                <>
                  <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 dark:bg-brand-900/20 text-brand-500"
                          : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  <NavLink
                    to="/add-car"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 dark:bg-brand-900/20 text-brand-500"
                          : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Add Car
                  </NavLink>
                  <NavLink
                    to="/my-added-cars"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 dark:bg-brand-900/20 text-brand-500"
                          : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    My Added Cars
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-body font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="btn-primary text-sm text-center mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
