import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import "./PostList.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")))
      .then((snap) => {
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      });
  }, []);

  return (
    <div className="postlist-page page-enter">
      <div className="container">
        <div className="postlist-header">
          <p className="section-label">Blog</p>
          <h1>All Posts</h1>
          <p className="postlist-sub">Thoughts, tutorials, and updates from Fluxenite.</p>
        </div>

        {loading ? (
          <div className="post-skeletons">
            {[...Array(4)].map((_, i) => <div className="post-skeleton" key={i}></div>)}
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-newspaper"></i>
            <p>No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((p) => (
              <Link to={`/blog/${p.id}`} key={p.id} className="post-card card">
                <div className="post-card-meta">
                  <span className="tag"><i className="fa-regular fa-calendar"></i>
                    {p.createdAt?.toDate?.().toLocaleDateString() || ""}
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p className="post-card-excerpt">{p.excerpt || p.content?.slice(0, 120)}...</p>
                <span className="post-read-more">Read more <i className="fa-solid fa-arrow-right"></i></span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
