import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase";
import "./Home.css";

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subMsg, setSubMsg] = useState("");

  useEffect(() => {
    // Fetch GitHub repos
    fetch(`https://api.github.com/orgs/${process.env.REACT_APP_GITHUB_ORG}/repos?sort=updated&per_page=20`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        setReposLoading(false);
      })
      .catch(() => setReposLoading(false));

    // Fetch latest blogs
    getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3)))
      .then((snap) => setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));

    // Fetch latest news
    getDocs(query(collection(db, "news"), orderBy("createdAt", "desc"), limit(3)))
      .then((snap) => setNews(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
      await setDoc(doc(db, "subscribers", email), { email, subscribedAt: serverTimestamp() });
      setSubMsg("You're in! 🎉");
      setEmail("");
    } catch {
      setSubMsg("Something went wrong. Try again.");
    }
  };

  const langColor = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5",
    HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219", Go: "#00ADD8",
  };

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="shape s1"></div>
          <div className="shape s2"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">
            <i className="fa-brands fa-github"></i>
            <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer">@FluxeniteMC</a>
          </div>
          <h1 className="hero-title">
            Building open tools<br />
            <span className="accent-text">for everyone.</span>
          </h1>
          <p className="hero-sub">
            Fluxenite is an individual nonprofit developer creating open-source software that empowers communities. No paywalls. No gatekeeping. Just code.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer" className="btn btn-primary">
              <i className="fa-brands fa-github"></i> View on GitHub
            </a>
            <Link to="/about" className="btn btn-outline">Learn more</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-strip">
        <div className="container stats-row">
          <div className="stat">
            <span>{repos.length}+</span>
            <label>Repositories</label>
          </div>
          <div className="stat-div"></div>
          <div className="stat">
            <span>100%</span>
            <label>Open Source</label>
          </div>
          <div className="stat-div"></div>
          <div className="stat">
            <span>Non-profit</span>
            <label>Organization</label>
          </div>
        </div>
      </section>

      {/* Repos Carousel */}
      <section className="repos-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Projects</p>
            <h2>Our Repositories</h2>
            <a href="https://github.com/FluxeniteMC" target="_blank" rel="noreferrer" className="view-all">
              All repos <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div className="repos-track-wrapper">
          {reposLoading ? (
            <div className="loading-row">
              {[...Array(5)].map((_, i) => <div className="repo-skeleton" key={i}></div>)}
            </div>
          ) : repos.length === 0 ? (
            <div className="container"><p className="no-data">No repositories found.</p></div>
          ) : (
            <div className={`repos-track${repos.length < 4 ? " repos-track--static" : ""}`}>
              {(repos.length < 4 ? repos : [...repos, ...repos]).map((repo, i) => (
                <a
                  key={i}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-card"
                >
                  <div className="repo-header">
                    <i className="fa-solid fa-code-branch repo-icon"></i>
                    <span className="repo-name">{repo.name}</span>
                  </div>
                  <p className="repo-desc">{repo.description || "No description provided."}</p>
                  <div className="repo-meta">
                    {repo.language && (
                      <span className="repo-lang">
                        <span className="lang-dot" style={{ background: langColor[repo.language] || "#888" }}></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="repo-stat">
                      <i className="fa-solid fa-star"></i> {repo.stargazers_count}
                    </span>
                    <span className="repo-stat">
                      <i className="fa-solid fa-code-fork"></i> {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog & News */}
      <section className="posts-section">
        <div className="container posts-grid">
          {/* Blog */}
          <div>
            <div className="section-header">
              <p className="section-label">Blog</p>
              <h2>Latest Posts</h2>
              <Link to="/blog" className="view-all">All posts <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            {blogs.length === 0 ? (
              <p className="no-data">No posts yet. Check back soon!</p>
            ) : (
              <div className="post-list">
                {blogs.map((b) => (
                  <Link to={`/blog/${b.id}`} key={b.id} className="post-row">
                    <div>
                      <h4>{b.title}</h4>
                      <p className="post-preview">{b.excerpt || b.content?.slice(0, 80)}...</p>
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* News */}
          <div>
            <div className="section-header">
              <p className="section-label">News</p>
              <h2>Latest News</h2>
              <Link to="/news" className="view-all">All news <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            {news.length === 0 ? (
              <p className="no-data">No news yet. Stay tuned!</p>
            ) : (
              <div className="post-list">
                {news.map((n) => (
                  <Link to={`/news/${n.id}`} key={n.id} className="post-row">
                    <div>
                      <h4>{n.title}</h4>
                      <p className="post-preview">{n.excerpt || n.content?.slice(0, 80)}...</p>
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="subscribe-section">
        <div className="container">
          <div className="subscribe-box">
            <div className="subscribe-icon"><i className="fa-solid fa-envelope-open-text"></i></div>
            <h2>Stay in the loop</h2>
            <p>Get updates on new projects, blog posts, and community news — no spam, ever.</p>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
            {subMsg && <p className="sub-msg">{subMsg}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
