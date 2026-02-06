const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./src/routes/product.route");
const blogRoutes = require("./src/routes/blog.route");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
