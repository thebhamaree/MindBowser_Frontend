import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BlogEditor() {
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchBlogs();
    }
  }, [isLoggedIn, navigate]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/user/${user.id}`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);
  
    const url = editingBlogId
    ? `http://localhost:5000/api/blogs/update/${editingBlogId}`
    : "http://localhost:5000/api/blogs/create";
    const method = "POST"; // 👈 use POST for both

    try {
      const response = await fetch(url, {
      method,
      body: formData,
    });

  
      const data = await response.json();
      if (response.ok) {
        alert(editingBlogId ? "Blog updated!" : "Blog created!");
        setTitle("");
        setContent("");
        setImage(null);
        setEditingBlogId(null);
        fetchBlogs();
      } else {
        alert(data.message || "Error saving blog");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/delete/${blogId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Blog deleted!");
        fetchBlogs();
      } else {
        alert(data.message || "Error deleting blog");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Styles
  const editorContainer = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "200px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const buttonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "red",
    float: "right",
  };

  const smallButtonStyle = {
    ...buttonStyle,
    padding: "5px 10px",
    fontSize: "14px",
    marginLeft: "10px",
    backgroundColor: "#007bff",
  };

  const deleteButtonStyle = {
    ...smallButtonStyle,
    backgroundColor: "red",
  };

  return (
    <div style={editorContainer}>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>

      <h2>{editingBlogId ? "Edit Blog Post" : "Create a New Blog Post"}</h2>
      <form onSubmit={handlePublish}>
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "20px" }}
        />

        <button type="submit" style={buttonStyle}>
          {editingBlogId ? "Update" : "Publish"}
        </button>

        {editingBlogId && (
          <button
            type="button"
            onClick={() => {
              setEditingBlogId(null);
              setTitle("");
              setContent("");
            }}
            style={{ ...buttonStyle, backgroundColor: "gray", marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3 style={{ marginTop: "40px" }}>Your Blogs</h3>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              marginTop: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            <h4>{blog.title}</h4>
            {blog.image_path && (
            <img
            src={`http://localhost:5000${blog.image_path}`}
            alt="Blog"
            style={{ maxWidth: "100%", marginBottom: "10px", borderRadius: "8px" }}
            />
            )}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />

            <button style={smallButtonStyle} onClick={() => handleEdit(blog)}>
              Edit
            </button>
            <button style={deleteButtonStyle} onClick={() => handleDelete(blog.id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p style={{ marginTop: "10px" }}>No blogs found.</p>
      )}
    </div>
  );
}

export default BlogEditor;
