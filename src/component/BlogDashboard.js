import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Stack,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

function BlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs/all")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Or "/" based on your routing
  };

  // Filter blogs by title or author name, case-insensitive
  const filteredBlogs = blogs.filter((blog) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      blog.title.toLowerCase().includes(lowerTerm) ||
      blog.user_name.toLowerCase().includes(lowerTerm)
    );
  });

  return (
    <Box sx={{ width: "100%", padding: "90px 40px 40px 40px", backgroundColor: "#121212", color: "#fff" }}>
      {/* Welcome + Logout Section */}
      {currentUser && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            px: 2,
            py: 1,
            borderRadius: "12px",
            backgroundColor: "rgba(0, 230, 118, 0.15)",
            color: "#00e676",
            fontFamily: '"Jaro", sans-serif',
            fontWeight: "bold",
            boxShadow: "0 0 10px rgba(0, 230, 118, 0.5)",
          }}
        >
          <Typography variant="h6">Welcome, {currentUser.username}!</Typography>
          <Button
            variant="outlined"
            color="success"
            onClick={handleLogout}
            sx={{
              borderRadius: "12px",
              fontWeight: "bold",
              color: "#00e676",
              borderColor: "#00e676",
              "&:hover": {
                backgroundColor: "#00e676",
                color: "#121212",
                borderColor: "#00e676",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      )}

      {/* Hero Section */}
      <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 6 }}>
        {/* Left Side Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/blog-image.jpg" // Place this inside /public folder
            alt="Blog Inspiration"
            sx={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "16px",
              objectFit: "cover",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>

        {/* Right Side Text */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Jaro", sans-serif',
              mb: 2,
              fontWeight: "bold",
              color: "#00e676",
            }}
          >
            Inspire & Be Inspired <br />
            BLOG'EM
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Jaro", sans-serif',
              mb: 3,
              color: "#bdbdbd",
            }}
          >
            Welcome to your blogging hub — read trending stories or <br />
            write your own and share your voice with the world.
          </Typography>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/editor"
            sx={{
              borderRadius: "12px",
              padding: "12px 24px",
              fontWeight: "bold",
              fontSize: "1rem",
              fontFamily: '"Jaro", sans-serif',
            }}
          >
            Start Writing
          </Button>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Box sx={{ mb: 4, maxWidth: "400px", marginTop: 15 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by blog title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#222",
            borderRadius: "8px",
            input: { color: "#fff", fontFamily: '"Jaro", sans-serif' },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#555",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00e676",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00e676",
            },
          }}
        />
      </Box>

      {/* Blog Posts */}
      {filteredBlogs.length > 0 ? (
        <Box sx={{ pt: 6 }}>
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={7}>
            {filteredBlogs.map((blog) => (
              <Card
                key={blog.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                    zIndex: 10,
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 180 }}
                  image={
                    blog.image_path
                      ? `http://localhost:5000${blog.image_path}`
                      : "https://via.placeholder.com/600x200?text=Blog+Image"
                  }
                  title={blog.title}
                />
                <CardContent>
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {blog.title}
                    </Typography>
                  </Link>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Author:</strong>{" "}
                    <Link
                      to={`/authors/${blog.user_name}`}
                      style={{ color: "#00e676", textDecoration: "underline" }}
                    >
                      {blog.user_name}
                    </Link>{" "}
                    | <strong>Date:</strong>{" "}
                    {new Date(blog.created_at).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body2">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: blog.content.slice(0, 200) + "...",
                      }}
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/blogs/${blog.id}`}>
                    Read More
                  </Button>

                  {currentUser && currentUser.name === blog.user_name && (
                    <Button
                      size="small"
                      component={Link}
                      to={`/edit/${blog.id}`}
                      sx={{ color: "orange" }}
                    >
                      Edit
                    </Button>
                  )}
                </CardActions>
              </Card>
            ))}
          </Masonry>
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 4 }}>No blogs found.</Typography>
      )}
    </Box>
  );
}

export default BlogDashboard;
