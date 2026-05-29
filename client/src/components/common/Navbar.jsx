import { useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { Settings, Menu, X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../../context/AuthContext";

const publicLinks = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Features",
    path: "/#features",
  },

  {
    name: "How It Works",
    path: "/#how-it-works",
  },
];

const privateLinks = [
  {
    name: "My Analysis",
    path: "/my-analysis",
  },

  {
    name: "Analyze",
    path: "/analyze",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();

    navigate("/");

    setMenuOpen(false);
  };

  const renderLinks = (mobile = false) => {
    const baseClass = mobile
      ? "hover:text-white transition"
      : "hover:text-white transition";

    return (
      <>
        {publicLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className={baseClass}
          >
            {link.name}
          </Link>
        ))}

        {isLoggedIn &&
          privateLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={baseClass}
            >
              {link.name}
            </Link>
          ))}
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold tracking-wide">
          AudioPilot
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {renderLinks()}
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              to="/auth"
              className="hidden md:flex px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition"
            >
              Get Started
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/settings"
                className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
              >
                <Settings size={18} />
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 transition text-sm"
              >
                Logout
              </button>
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="md:hidden border-t border-white/10 bg-black px-6 py-6"
          >
            <div className="flex flex-col gap-6 text-gray-300">
              {renderLinks(true)}

              {isLoggedIn ? (
                <>
                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-white transition"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-white text-black font-medium"
                >
                  Get Started
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
