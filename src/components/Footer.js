import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-icon"><i className="fa-solid fa-bolt"></i></span>
            Fluxenite
          </div>
          <p>Open-source, community-driven nonprofit development. Building tools that matter.</p>
          <div className="social-links">
            <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h5>Navigate</h5>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/news">News</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer">GitHub</a>
            <Link to="/subscribe">Subscribe</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Fluxenite. All rights reserved.</span>
          <span className="footer-made">Nonprofit · Open Source · Community Driven</span>
        </div>
      </div>
    </footer>
  );
}
