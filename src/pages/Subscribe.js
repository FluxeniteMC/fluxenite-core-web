import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./Subscribe.css";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "subscribers", email), { email, subscribedAt: serverTimestamp() });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="subscribe-page page-enter">
      <div className="container">
        <div className="subscribe-page-box card">
          <div className="sub-icon"><i className="fa-solid fa-envelope-open-text"></i></div>
          <h1>Subscribe to Updates</h1>
          <p>Get the latest blog posts, news, and project updates from Fluxenite delivered to your inbox. No spam, ever. Unsubscribe anytime.</p>

          {status === "success" ? (
            <div className="sub-success">
              <i className="fa-solid fa-circle-check"></i>
              <strong>You're subscribed!</strong>
              <span>We'll be in touch with the latest from Fluxenite.</span>
            </div>
          ) : (
            <form className="sub-form" onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="sub-error">
                  <i className="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.
                </div>
              )}
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Subscribing…</> : <>Subscribe <i className="fa-solid fa-arrow-right"></i></>}
              </button>
            </form>
          )}

          <div className="sub-features">
            {[
              { icon: "fa-pen-nib", text: "New blog posts" },
              { icon: "fa-bolt", text: "Breaking news" },
              { icon: "fa-code-branch", text: "Project launches" },
            ].map((f) => (
              <div className="sub-feature" key={f.text}>
                <i className={`fa-solid ${f.icon}`}></i>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
