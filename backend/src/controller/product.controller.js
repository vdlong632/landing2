const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/product.json");

const readData = () => {
  try {
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
  } catch (err) {
    console.error("Error reading JSON:", err);
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET /api/products
exports.getProducts = (req, res) => {
  const products = readData();
  res.json(products);
};

// GET /api/products/:id
exports.getProductById = (req, res) => {
  const products = readData();
  const product = products.find((p) => p.id === +req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

//Get /api/products/slug
exports.getProductBySlug = (req, res) => {
  const products = readData();
  const product = products.find((p) => p.slug === req.params.slug);

  if (!product) {
    return res
      .status(404)
      .json({ message: "Sản phẩm không tồn tại với slug này" });
  }

  res.json(product);
};

// POST /api/products
exports.createProduct = (req, res) => {
  const products = readData();
  const newProduct = {
    id: Date.now(),
    ...req.body,
  };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
};

// PUT /api/products/:id
exports.updateProduct = (req, res) => {
  const products = readData();
  const index = products.findIndex((p) => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
};

// DELETE /api/products/:id
exports.deleteProduct = (req, res) => {
  const products = readData();
  const newProducts = products.filter((p) => p.id !== +req.params.id);
  writeData(newProducts);
  res.json({ message: "Deleted" });
};
