// src/components/BlogView.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CardMedia,
  Divider,
} from "@mui/material";

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => {
        console.error("Error loading blog:", err);
        alert("Failed to load blog");
        navigate("/");
      });
  }, [id, navigate]);

  if (!blog) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        <strong>By:</strong> {blog.user_name} |{" "}
        <strong>Date:</strong> {new Date(blog.created_at).toLocaleDateString()}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {blog.image_path && (
        <CardMedia
          component="img"
          image={`http://localhost:5000${blog.image_path}`}
          alt="Blog Cover"
          sx={{
            width: "100%",
            maxHeight: 500,
            objectFit: "cover",
            borderRadius: 2,
            mb: 3,
          }}
        />
      )}

      <Box sx={{ typography: "body1" }}>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Box>
    </Container>
  );
}

export default BlogView;
