import React from "react";
import { Link, useNavigate } from "react-router-dom";

// ✅ Paste styles HERE
const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#000",
  padding: "0 20px",
  height: "60px",
  fontFamily: "sans-serif",
};

const logoStyle = {
  color: "yellow",
  fontSize: "28px",
  paddingLeft: "10px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontFamily: "'Jaro', sans-serif",
};

const linkContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "30px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  cursor: "pointer",
};

// ✅ Component starts here
function Navbar() {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleMyPosts = () => {
    if (isLoggedIn) {
      navigate("/myblogs");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>BLOG'EM</div>

      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/new-blogs" style={linkStyle}>New Blogs</Link>

        <button onClick={handleMyPosts} style={{ ...linkStyle, background: "transparent", border: "none" }}>
          My Posts
        </button>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/signup" style={linkStyle}>Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
