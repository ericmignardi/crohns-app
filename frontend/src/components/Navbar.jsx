import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`mx-auto p-4 fixed top-0 left-0 w-full ${
        isMobileMenuOpen ? "h-full" : ""
      } z-10 bg-transparent`}
    >
      <nav className="flex justify-between items-center">
        <Link to="/" className="font-[Lora] text-[32px]">
          Wellness
        </Link>
        <div className="md:hidden relative">
          <button onClick={toggleMobileMenu} className="text-xl relative z-20">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="hidden md:flex justify-end items-center gap-4">
          <li>
            <Link to="/" className="link link-hover">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className="link link-hover">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/chat" className="link link-hover">
              Chat
            </Link>
          </li>
          <li>
            <Link to="/about" className="link link-hover">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link link-hover">
              Contact
            </Link>
          </li>
          {!authUser ? (
            <>
              <li>
                <Link to="/login" className="flex items-center">
                  <div className="avatar">
                    <div className="ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ring-gray-500">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="Profile Picture"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="btn btn-primary text-[var(--light)] rounded-full"
                >
                  Join Us!
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="flex items-center">
                  <div className="avatar">
                    <div className="ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ring-accent">
                      <img
                        src={
                          authUser.profile_pic ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt="Profile Picture"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-primary text-[var(--light)] rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 size-full bg-base-300 opacity-90 shadow-lg z-10 flex justify-center items-center">
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link
                to="/"
                className="link link-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recipes"
                className="link link-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="link link-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chat
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="link link-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="link link-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {!authUser ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="avatar">
                      <div className="ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ring-gray-500">
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          alt="Profile Picture"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="btn btn-primary text-[var(--light)] rounded-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Us!
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="avatar">
                      <div className="ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ring-[var(--blue)]">
                        <img
                          src={
                            authUser.profile_pic ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                          alt="Profile Picture"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <button
                    className="btn bg-[var(--teal)] rounded-full"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
