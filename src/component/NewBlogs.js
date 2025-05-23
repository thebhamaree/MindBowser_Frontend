// src/pages/NewBlogs.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

function NewBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs/all")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setBlogs(sorted);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
        padding: "90px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Jaro', sans-serif",
          color: "#00e676",
          mb: 5,
        }}
      >
        📰 Newest Blogs First
      </Typography>

      {blogs.length > 0 ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={7}>
          {blogs.map((blog) => (
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
                  style={{ textDecoration: "none", color: "#00e676" }}
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
                  |             <strong>Date:</strong>{" "}
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
                <Button
                  size="small"
                  component={Link}
                  to={`/blogs/${blog.id}`}
                  sx={{ color: "#00e676" }}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Masonry>
      ) : (
        <Typography>No blogs available.</Typography>
      )}
    </Box>
  );
}

export default NewBlogs;
