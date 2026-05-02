import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function SignIn() {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await googleSignIn();
      navigate("/");
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card card">
        <div className="auth-logo">
          <span className="brand-icon"><i className="fa-solid fa-bolt"></i></span>
          <span className="auth-brand">Fluxenite</span>
        </div>
        <h2>Sign in</h2>
        <p className="auth-sub">Welcome back! Sign in to continue.</p>

        {error && <div className="auth-error"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Signing in…</> : "Sign in"}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button className="btn btn-outline google-btn" onClick={handleGoogle}>
          <i className="fa-brands fa-google"></i> Continue with Google
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
