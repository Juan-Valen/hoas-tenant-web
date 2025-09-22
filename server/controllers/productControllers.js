const Product = require("../models/productModel");
const mongoose = require("mongoose");

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "Approved" }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// POST new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, free, sellerName, category, images } = req.body;
    const newProduct = await Product.create({ title, description, price, free, sellerName, category, images });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// GET by ID
const getProductById = async (req, res) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(400).json({ message: "Invalid ID" });
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

module.exports = { getAllProducts, createProduct, getProductById };
