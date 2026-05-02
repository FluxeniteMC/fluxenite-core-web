import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import "./PostList.css";

export default function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "news"), orderBy("createdAt", "desc")))
      .then((snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      });
  }, []);

  return (
    <div className="postlist-page page-enter">
      <div className="container">
        <div className="postlist-header">
          <p className="section-label">News</p>
          <h1>Latest News</h1>
          <p className="postlist-sub">Updates, announcements, and happenings at Fluxenite.</p>
        </div>

        {loading ? (
          <div className="post-skeletons">
            {[...Array(4)].map((_, i) => <div className="post-skeleton" key={i}></div>)}
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-bullhorn"></i>
            <p>No news yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="post-grid">
            {items.map((n) => (
              <Link to={`/news/${n.id}`} key={n.id} className="post-card card">
                <div className="post-card-meta">
                  <span className="tag"><i className="fa-solid fa-bolt"></i> News</span>
                  <span className="tag"><i className="fa-regular fa-calendar"></i>
                    {n.createdAt?.toDate?.().toLocaleDateString() || ""}
                  </span>
                </div>
                <h3>{n.title}</h3>
                <p className="post-card-excerpt">{n.excerpt || n.content?.slice(0, 120)}...</p>
                <span className="post-read-more">Read more <i className="fa-solid fa-arrow-right"></i></span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
