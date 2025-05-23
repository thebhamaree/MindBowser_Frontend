import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);

      fetch("http://localhost:5000/api/blogs/all")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (blog) => blog.user_name.toLowerCase() === user.username.toLowerCase()
          );
          setBlogs(filtered);
        })
        .catch((err) => console.error("Error fetching blogs:", err));
    }
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
        📝 Your Blogs {username && `(${username})`}
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
                  sx={{ color: "gray", mb: 1 }}
                >
                  <strong>Date:</strong>{" "}
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

                {/* New Edit button linking to BlogEditor with blog id */}
                <Button
                  size="small"
                  component={Link}
                  to={`/editor/${blog.id}`}
                  sx={{ color: "#00e676" }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          ))}
        </Masonry>
      ) : (
        <Typography>
          {username ? `No blogs found for ${username}.` : "You are not logged in."}
        </Typography>
      )}
    </Box>
  );
}

export default UserBlogs;
