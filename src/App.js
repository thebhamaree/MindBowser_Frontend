// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./component/auth/Signup";
import Login from "./component/auth/Login";
import BlogDashboard from './component/BlogDashboard'
import BlogEditor from './component/BlogEditor'; 
import Navbar from "./component/Navbar";
import BlogView from "./component/BlogView"; 
import NewBlogs from "./component/NewBlogs";
import AuthorBlogs from './component/AuthorBlogs';
import UserBlogs from "./component/UserBlogs"; // 




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogDashboard />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/editor/:id" element={<BlogEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-blogs" element={<NewBlogs />} />
        <Route path="/authors/:author" element={<AuthorBlogs />} />
        <Route path="/myblogs" element={<UserBlogs />} /> 



      </Routes>
    </Router>
  );
}


export default App;
