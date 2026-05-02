import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./PostDetail.css";

export default function PostDetail({ collection: col }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, col, id)).then((snap) => {
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
      setLoading(false);
    });
  }, [id, col]);

  if (loading) return (
    <div className="post-detail-page page-enter">
      <div className="container">
        <div className="detail-skeleton"></div>
      </div>
    </div>
  );

  if (!post) return (
    <div className="post-detail-page page-enter">
      <div className="container">
        <div className="empty-state">
          <i className="fa-solid fa-circle-exclamation"></i>
          <p>Post not found.</p>
          <Link to={col === "blogs" ? "/blog" : "/news"} className="btn btn-outline" style={{marginTop:"16px"}}>← Back</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="post-detail-page page-enter">
      <div className="container">
        <Link to={col === "blogs" ? "/blog" : "/news"} className="back-link">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
        <article className="post-article">
          <div className="post-meta-row">
            <span className="tag">
              <i className={`fa-solid ${col === "blogs" ? "fa-pen-nib" : "fa-bolt"}`}></i>
              {col === "blogs" ? "Blog" : "News"}
            </span>
            {post.createdAt && (
              <span className="tag">
                <i className="fa-regular fa-calendar"></i>
                {post.createdAt.toDate?.().toLocaleDateString()}
              </span>
            )}
          </div>
          <h1 className="post-title">{post.title}</h1>
          {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
          <div className="post-body">
            {post.content?.split("\n").map((line, i) => (
              line ? <p key={i}>{line}</p> : <br key={i} />
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
