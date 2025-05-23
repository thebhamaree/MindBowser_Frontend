import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/editor");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      // Optional: You could redirect user to login or editor after signup success
      // e.g. navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        <div style={{ marginTop: "15px" }}>
  <button
    type="button"
    onClick={() => navigate("/")}
    style={{ ...styles.button, background: "transparent", borderColor: "#0ff", marginBottom: "10px" }}
  >
    Home
  </button>
  <p style={{ color: "#ccc" }}>
    Already registered?{" "}
    <span
      style={{ color: "#0ff", cursor: "pointer", textDecoration: "underline" }}
      onClick={() => navigate("/login")}
    >
      Go to Login
    </span>
  </p>
</div>

      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#0d1117",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    width: "100%",
    maxWidth: "350px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#f0f0f0",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#161b22",
    color: "#fff",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "rgba(0, 255, 255, 0.15)",
    border: "1px solid rgba(0, 255, 255, 0.3)",
    borderRadius: "8px",
    color: "#0ff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  }
};

export default Signup;
