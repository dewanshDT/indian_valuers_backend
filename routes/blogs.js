const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (req.body.userID === blog.authorID) {
      await Blog.deleteOne(blog);
      res.json({
        status: 200,
        message: "deleted successfully",
      });
    } else {
      req.json({
        status: 403,
        message: "not allowed",
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (req.body.userID === blog.authorID) {
      blog.title = req.body.title;
      blog.markdown = req.body.markdown;
      blog.tags = req.body.tags;
      await blog.save();
      res.json({
        status: 200,
        blog: blog,
      });
    } else {
      req.json({
        status: 403,
        message: "not allowed",
      });
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json({
        status: 200,
        blog: blog,
      });
    } else {
      res.json({
        status: 404,
        message: "not found",
      });
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: "desc" });
    res.json({
      status: 200,
      blogs: blogs,
    });
  } catch (e) {
    res.json({
      status: 500,
      message: "error",
    });
  }
});

router.post("/", async (req, res) => {
  const { title, markdown, tags } = req.body;
  try {
    const blog = new Blog(req.body);
    await blog.save();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
