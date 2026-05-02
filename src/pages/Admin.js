import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./Admin.css";

const TABS = ["Users", "Blog", "News", "Contacts", "Subscribers"];

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState("Blog");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const loadPosts = async (col) => {
    const snap = await getDocs(query(collection(db, col), orderBy("createdAt", "desc")));
    setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const loadContacts = async () => {
    const snap = await getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc")));
    setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const loadSubscribers = async () => {
    const snap = await getDocs(collection(db, "subscribers"));
    setSubscribers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    if (tab === "Users") loadUsers();
    else if (tab === "Blog") loadPosts("blogs");
    else if (tab === "News") loadPosts("news");
    else if (tab === "Contacts") loadContacts();
    else if (tab === "Subscribers") loadSubscribers();
    setEditItem(null);
    setForm({ title: "", excerpt: "", content: "" });
  }, [tab]);

  if (!isAdmin) return <Navigate to="/" />;

  const col = tab === "Blog" ? "blogs" : "news";

  const savePost = async () => {
    if (!form.title || !form.content) return showToast("Title and content required.");
    if (editItem) {
      await updateDoc(doc(db, col, editItem.id), { ...form, updatedAt: serverTimestamp() });
      showToast("Post updated!");
    } else {
      await addDoc(collection(db, col), { ...form, createdAt: serverTimestamp() });
      showToast("Post created!");
    }
    setEditItem(null);
    setForm({ title: "", excerpt: "", content: "" });
    loadPosts(col);
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteDoc(doc(db, col, id));
    showToast("Deleted.");
    loadPosts(col);
  };

  const changeRole = async (uid, role) => {
    await updateDoc(doc(db, "users", uid), { role });
    showToast(`Role updated to ${role}`);
    loadUsers();
  };

  const startEdit = (item) => {
    setEditItem(item);
    setForm({ title: item.title, excerpt: item.excerpt || "", content: item.content || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-page page-enter">
      {toast && <div className="toast"><i className="fa-solid fa-check"></i> {toast}</div>}

      <div className="container">
        <div className="admin-header">
          <div className="admin-title">
            <span className="admin-badge"><i className="fa-solid fa-shield-halved"></i></span>
            <div>
              <h1>Admin Dashboard</h1>
              <p className="admin-user">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* Blog / News Editor */}
        {(tab === "Blog" || tab === "News") && (
          <div className="admin-content">
            <div className="admin-editor card">
              <h3>{editItem ? `Edit ${tab} Post` : `New ${tab} Post`}</h3>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" placeholder="Post title"
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Excerpt <span className="optional">(optional)</span></label>
                <input type="text" className="form-control" placeholder="Short description"
                  value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea className="form-control" rows={10} placeholder="Write your content here…"
                  value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  style={{ resize: "vertical" }} />
              </div>
              <div className="editor-actions">
                {editItem && (
                  <button className="btn btn-ghost" onClick={() => { setEditItem(null); setForm({ title: "", excerpt: "", content: "" }); }}>
                    Cancel
                  </button>
                )}
                <button className="btn btn-primary" onClick={savePost}>
                  <i className="fa-solid fa-floppy-disk"></i> {editItem ? "Update" : "Publish"}
                </button>
              </div>
            </div>

            <div className="admin-list">
              <h3>Published {tab} Posts ({posts.length})</h3>
              {posts.length === 0 ? (
                <p className="no-data">No posts yet.</p>
              ) : posts.map((p) => (
                <div className="admin-list-item card" key={p.id}>
                  <div className="ali-info">
                    <strong>{p.title}</strong>
                    <span>{p.createdAt?.toDate?.().toLocaleDateString()}</span>
                  </div>
                  <div className="ali-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => startEdit(p)}>
                      <i className="fa-solid fa-pen"></i> Edit
                    </button>
                    <button className="btn btn-ghost btn-sm btn-danger" onClick={() => deletePost(p.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users */}
        {tab === "Users" && (
          <div className="admin-table-wrap card">
            <h3>All Users ({users.length})</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>UID</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.email}</td>
                    <td className="uid-cell">{u.uid}</td>
                    <td><span className={`role-badge role-${u.role}`}>{u.role || "user"}</span></td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                    <td>
                      {u.uid !== process.env.REACT_APP_ADMIN_UID && (
                        <select
                          className="form-control role-select"
                          value={u.role || "user"}
                          onChange={(e) => changeRole(u.id, e.target.value)}
                        >
                          <option value="user">user</option>
                          <option value="editor">editor</option>
                          <option value="admin">admin</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contacts */}
        {tab === "Contacts" && (
          <div className="admin-table-wrap card">
            <h3>Contact Messages ({contacts.length})</h3>
            {contacts.length === 0 ? (
              <p className="no-data">No messages yet.</p>
            ) : contacts.map((c) => (
              <div className="admin-list-item card" key={c.id} style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                <div className="ali-info">
                  <strong>{c.name}</strong> · <span>{c.email}</span>
                  <span style={{ marginLeft: "auto" }}>{c.createdAt?.toDate?.().toLocaleDateString()}</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{c.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Subscribers */}
        {tab === "Subscribers" && (
          <div className="admin-table-wrap card">
            <h3>Email Subscribers ({subscribers.length})</h3>
            <table className="admin-table">
              <thead>
                <tr><th>Email</th><th>Subscribed</th></tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s.id}>
                    <td>{s.email}</td>
                    <td>{s.subscribedAt?.toDate?.().toLocaleDateString() || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
