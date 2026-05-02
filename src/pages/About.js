import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about page-enter">
      <section className="about-hero">
        <div className="container">
          <p className="section-label">About Us</p>
          <h1>What is Fluxenite?</h1>
          <p className="about-lead">
            Fluxenite is an individual nonprofit developer dedicated to building open-source software
            that serves communities. No corporate agenda. No paywalls. Just meaningful code.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container about-grid">
          <div className="about-main">
            <div className="about-block">
              <h3><i className="fa-solid fa-seedling"></i> Our Mission</h3>
              <p>
                We believe technology should be accessible to everyone. Fluxenite develops and maintains
                open-source tools that empower individuals, communities, and small organizations — all
                without the barriers of cost or proprietary licensing.
              </p>
            </div>
            <div className="about-block">
              <h3><i className="fa-solid fa-code"></i> How We Work</h3>
              <p>
                All our projects are publicly available on GitHub. We build in the open, accept
                contributions, and welcome feedback from anyone. Our work is driven by community need,
                not profit motive.
              </p>
            </div>
            <div className="about-block">
              <h3><i className="fa-solid fa-heart"></i> Nonprofit Commitment</h3>
              <p>
                As a nonprofit individual developer, every project we create is done out of passion
                for the craft and care for the community. No hidden monetization. No selling data.
                No advertisements.
              </p>
            </div>
          </div>

          <div className="about-sidebar">
            <div className="card about-cta-card">
              <i className="fa-brands fa-github about-cta-icon"></i>
              <h4>See Our Work</h4>
              <p>Browse all our open-source projects on GitHub.</p>
              <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer" className="btn btn-primary" style={{width:"100%", justifyContent:"center"}}>
                <i className="fa-brands fa-github"></i> GitHub
              </a>
            </div>

            <div className="card about-cta-card" style={{marginTop:"16px"}}>
              <i className="fa-solid fa-envelope about-cta-icon"></i>
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for updates.</p>
              <Link to="/subscribe" className="btn btn-outline" style={{width:"100%", justifyContent:"center"}}>
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <p className="section-label">Values</p>
          <h2>What We Stand For</h2>
          <div className="values-grid">
            {[
              { icon: "fa-lock-open", title: "Open Source", desc: "All code is publicly available, forkable, and auditable." },
              { icon: "fa-users", title: "Community First", desc: "Built by the community, for the community." },
              { icon: "fa-shield-halved", title: "Privacy", desc: "We don't collect or sell user data. Ever." },
              { icon: "fa-infinity", title: "Free Forever", desc: "Our tools are and will always be free to use." },
            ].map((v) => (
              <div className="value-card card" key={v.title}>
                <div className="value-icon"><i className={`fa-solid ${v.icon}`}></i></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
