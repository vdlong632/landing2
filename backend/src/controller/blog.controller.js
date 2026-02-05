const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/blog.json");

const readData = () => {
  try {
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
  } catch (err) {
    console.error("Error reading JSON:", err);
    return [];
  }
};

// const writeData = (data) => {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };

exports.getBlogs = (req, res) => {
    const blogs = readData();
    res.json(blogs)
}

exports.getBlogById = (req, res) => {
    const blogs = readData();
    const blog = blogs.find((b) => b.id === +req.params.id);
    if(!blog) return res.status(404).json({message: "Not found"});
    res.json(blog)
}

exports.getBlogBySlug = (req, res) => {
  const blogs = readData();
  const blog = blogs.find((p) => p.slug === req.params.slug);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "Sản phẩm không tồn tại với slug này" });
  }

  res.json(blog);
};