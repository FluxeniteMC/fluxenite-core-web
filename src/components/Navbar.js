import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = async () => { await logout(); navigate("/"); };
  const isActive = (p) => location.pathname === p;
  const icon = theme === "dark" ? "fa-sun" : "fa-moon";

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">

        {/* Brand */}
        <Link to="/" className="brand">
          <span className="brand-icon"><i className="fa-solid fa-bolt"></i></span>
          Fluxenite
        </Link>

        {/* Desktop nav links (hidden on mobile) */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/"        className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
          <Link to="/about"   className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>
          <Link to="/blog"    className={`nav-link ${isActive("/blog") ? "active" : ""}`}>Blog</Link>
          <Link to="/news"    className={`nav-link ${isActive("/news") ? "active" : ""}`}>News</Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
          {isAdmin && (
            <Link to="/admin" className={`nav-link nav-admin ${isActive("/admin") ? "active" : ""}`}>
              <i className="fa-solid fa-shield-halved"></i> Dashboard
            </Link>
          )}
        </div>

        {/* Desktop right: theme toggle + auth */}
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fa-solid ${icon}`}></i>
          </button>
          {user ? (
            <div className="user-menu">
              <span className="user-avatar">
                {user.photoURL ? <img src={user.photoURL} alt="" /> : <i className="fa-solid fa-user"></i>}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> Sign out
              </button>
            </div>
          ) : (
            <Link to="/signin" className="btn btn-primary btn-sm">
              <i className="fa-solid fa-right-to-bracket"></i> Sign in
            </Link>
          )}
        </div>

        {/* Mobile bar: theme + hamburger */}
        <div className="mobile-bar">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fa-solid ${icon}`}></i>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

      </div>
    </nav>
  );
}
