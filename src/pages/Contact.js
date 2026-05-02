import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), { ...form, createdAt: serverTimestamp() });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="contact-page page-enter">
      <div className="container contact-layout">
        <div className="contact-info">
          <p className="section-label">Contact</p>
          <h1>Get in Touch</h1>
          <p className="contact-sub">
            Have a question, idea, or want to collaborate? We'd love to hear from you.
          </p>

          <div className="contact-links">
            <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer" className="contact-link">
              <span className="contact-link-icon"><i className="fa-brands fa-github"></i></span>
              <div>
                <strong>GitHub</strong>
                <span>@FluxeniteMC</span>
              </div>
            </a>
          </div>
        </div>

        <div className="contact-form-wrap">
          {status === "success" ? (
            <div className="card contact-success">
              <i className="fa-solid fa-circle-check"></i>
              <h3>Message sent!</h3>
              <p>We'll get back to you as soon as possible.</p>
              <button className="btn btn-outline" onClick={() => setStatus("")}>Send another</button>
            </div>
          ) : (
            <div className="card">
              {status === "error" && (
                <div className="auth-error">
                  <i className="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Your name"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" className="form-control" placeholder="you@example.com"
                    value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" className="form-control" rows={6} placeholder="Tell us what's on your mind…"
                    value={form.message} onChange={handleChange} required style={{resize:"vertical"}} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{width:"100%",justifyContent:"center"}}>
                  {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending…</> : <><i className="fa-solid fa-paper-plane"></i> Send message</>}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
