const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  getBlogBySlug,
} = require("../controllers/blog.controller");
router.get("/slug/:slug", getBlogBySlug);
router.get("/", getBlogs);
router.get("/:id", getBlogById);

module.exports = router;
