import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/editor");
    } else {
      setMessage(data.message || "Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        {message && <p style={styles.error}>{message}</p>}
        <div style={{ marginTop: "15px" }}>
  <button
    type="button"
    onClick={() => navigate("/")}
    style={{ ...styles.button, background: "transparent", borderColor: "#0ff", marginBottom: "10px" }}
  >
    Home
  </button>
  <p style={{ color: "#ccc" }}>
    Not registered?{" "}
    <span
      style={{ color: "#0ff", cursor: "pointer", textDecoration: "underline" }}
      onClick={() => navigate("/signup")}
    >
      Go to Signup
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
  },
  error: {
    color: "#ff6b6b",
    marginTop: "15px",
  },
};

export default Login;
